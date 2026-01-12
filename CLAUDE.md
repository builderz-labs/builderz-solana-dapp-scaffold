# Solana Development Rules

This file configures AI coding assistants for Solana program development. Follow these rules to produce secure, optimized, and correct code.

## Modern Tooling (2025)

**USE THESE - NOT OUTDATED ALTERNATIVES:**

| Category | Modern (Use This) | Outdated (Avoid) |
| -------- | ----------------- | ---------------- |
| Program SDK | `pinocchio`, `solana-program` 2.x | `solana-program` 1.x |
| Framework | Anchor 0.32+, Steel | Anchor < 0.30 |
| Unit Testing | Mollusk, LiteSVM | `solana-program-test` alone |
| Local Dev | Surfpool | `solana-test-validator` alone |
| Client SDK | `@solana/kit` (web3.js 2.0) | `@solana/web3.js` 1.x |
| Fuzz Testing | Trident | None |

## Stack Configuration

Uncomment and configure based on your project:

```
# Framework: anchor | native | pinocchio | steel
# Client: typescript (@solana/kit) | rust | python
# Testing: mollusk | litesvm | trident | bankrun
# Local: surfpool | solana-test-validator
```

---

## Critical Rules

### NEVER

1. **NEVER use deprecated crates:**

   - `solana-program` < 2.0 → use `solana-program` 2.x or `pinocchio`
   - `solana-sdk` < 2.0 → use `solana-sdk` 2.x
   - `spl-token` < 5.0 → use `spl-token` 5.x or `spl-token-2022`
   - `@solana/web3.js` 1.x → use `@solana/kit` (web3.js 2.0)

2. **NEVER deploy to mainnet without explicit user confirmation** - always ask first

3. **NEVER use unchecked arithmetic:**

   ```rust
   // WRONG
   let total = amount_a + amount_b;

   // CORRECT
   let total = amount_a.checked_add(amount_b).ok_or(ErrorCode::Overflow)?;
   ```

4. **NEVER skip account validation** - every account must be validated for owner, signer status, and PDA derivation

5. **NEVER hardcode keypairs, private keys, or RPC endpoints**

6. **NEVER use `unwrap()` in on-chain program code** - use proper error handling

7. **NEVER assume account data layout** - always deserialize explicitly

### ALWAYS

1. **ALWAYS verify account ownership before reading/writing:**

   ```rust
   if *account.owner != expected_program_id {
       return Err(ProgramError::IncorrectProgramId);
   }
   ```

2. **ALWAYS use canonical bump seeds for PDAs** - store and reuse the bump

3. **ALWAYS set explicit compute unit limits in transactions**

4. **ALWAYS validate all accounts passed to instructions**

5. **ALWAYS calculate rent-exempt minimum for account creation**

6. **ALWAYS simulate transactions before sending to mainnet**

---

## Framework Selection

| Scenario                 | Recommendation   | Reason                            |
| ------------------------ | ---------------- | --------------------------------- |
| Rapid prototyping        | Anchor           | Auto-generated IDL, better DX     |
| Team collaboration       | Anchor           | Standardized patterns             |
| CU optimization critical | Pinocchio        | 80-95% CU reduction               |
| Maximum control needed   | Pinocchio/Native | Zero-copy, no abstractions        |
| Minimal binary size      | Pinocchio        | Smallest footprint                |
| Native + better DX       | Steel            | Balance of control and ergonomics |

### When to Optimize

Start with Anchor. Optimize to Pinocchio/Native when:

- Transaction costs become significant at scale
- CU limits are being hit
- Binary size affects deployment costs
- Maximum throughput is required

---

## Token Program Selection

| Feature Needed              | Program          | Notes                              |
| --------------------------- | ---------------- | ---------------------------------- |
| Simple fungible token       | SPL Token        | Classic, widely supported          |
| Transfer fees               | Token-2022       | Issuer fee on transfers            |
| Confidential transfers      | Token-2022       | Encrypted balances/amounts         |
| Transfer hooks              | Token-2022       | Custom logic on transfers          |
| Permanent delegate          | Token-2022       | Compliance/seizure capability      |
| Non-transferable tokens     | Token-2022       | Soulbound tokens                   |
| Interest-bearing tokens     | Token-2022       | Auto-accruing value                |

### Token-2022 Critical Rules

```rust
// WRONG - transfer() fails with transfer fees
token::transfer(cpi_ctx, amount)?;

// CORRECT - use transfer_checked for Token-2022
token::transfer_checked(cpi_ctx, amount, decimals)?;
```

**Compatibility:** Some wallets/dApps don't support all extensions. Test on devnet with target integrators.

---

## Program Patterns

### Account Validation Order

Always validate in this order:

1. Account ownership
2. Signer status
3. PDA derivation
4. Data constraints

### Anchor Pattern

```rust
#[derive(Accounts)]
pub struct Transfer<'info> {
    #[account(
        mut,
        has_one = authority,
        constraint = source.amount >= amount @ ErrorCode::InsufficientFunds
    )]
    pub source: Account<'info, TokenAccount>,

    #[account(mut)]
    pub destination: Account<'info, TokenAccount>,

    pub authority: Signer<'info>,

    #[account(
        seeds = [b"vault", source.key().as_ref()],
        bump = vault.bump,
    )]
    pub vault: Account<'info, Vault>,
}
```

### Native/Pinocchio Pattern

```rust
pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    data: &[u8],
) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();
    let source = next_account_info(accounts_iter)?;
    let authority = next_account_info(accounts_iter)?;

    // 1. Owner check
    if source.owner != program_id {
        return Err(ProgramError::IncorrectProgramId);
    }

    // 2. Signer check
    if !authority.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }

    // 3. PDA verification
    let (expected_pda, bump) = Pubkey::find_program_address(
        &[b"vault", source.key.as_ref()],
        program_id,
    );
    if expected_pda != *vault.key {
        return Err(ProgramError::InvalidSeeds);
    }

    // 4. Data validation
    let source_data = TokenAccount::try_from_slice(&source.data.borrow())?;
    if source_data.amount < amount {
        return Err(ErrorCode::InsufficientFunds.into());
    }

    Ok(())
}
```

### Error Handling

```rust
#[error_code]
pub enum ErrorCode {
    #[msg("Arithmetic overflow")]
    Overflow,
    #[msg("Insufficient funds for transfer")]
    InsufficientFunds,
    #[msg("Invalid account owner")]
    InvalidOwner,
    #[msg("Unauthorized signer")]
    Unauthorized,
    #[msg("Invalid PDA derivation")]
    InvalidPDA,
}
```

---

## Testing

### Framework Selection

| Framework   | Best For                         | Speed   |
| ----------- | -------------------------------- | ------- |
| Mollusk     | Unit tests, CU benchmarking      | Fastest |
| LiteSVM     | Integration tests, multi-program | Fast    |
| Trident     | Fuzz testing, edge-case discovery| Medium  |
| Surfpool    | Mainnet state simulation         | Medium  |
| Anchor test | E2E with TypeScript clients      | Slower  |

### Trident Fuzzing (Solana Foundation Supported)

```bash
# Install
cargo install trident-cli

# Initialize in your project
trident init

# Run fuzz campaign
trident fuzz run

# Run specific fuzz target
trident fuzz run-hfuzz <fuzz_target>
```

Trident finds edge cases that unit tests miss - use before security audits.

### Mollusk Example

```rust
use mollusk_svm::Mollusk;

#[test]
fn test_transfer() {
    let program_id = Pubkey::new_unique();
    let mollusk = Mollusk::new(&program_id, "target/deploy/program");

    let result = mollusk.process_instruction(
        &instruction,
        &[(key, account.clone())],
    );

    assert!(result.program_result.is_ok());
    println!("CUs consumed: {}", result.compute_units_consumed);
}
```

### LiteSVM Example

```rust
use litesvm::LiteSVM;

#[test]
fn test_integration() {
    let mut svm = LiteSVM::new();
    svm.add_program(program_id, "target/deploy/program.so");

    let tx = Transaction::new_signed_with_payer(...);
    let result = svm.send_transaction(tx);

    assert!(result.is_ok());
}
```

### Required Test Coverage

- [ ] All instruction success paths
- [ ] All instruction error paths
- [ ] Account validation failures (wrong owner, missing signer)
- [ ] Arithmetic edge cases (max values, zero, overflow)
- [ ] PDA derivation (correct seeds, wrong seeds)
- [ ] CPI calls (if applicable)

---

## Client Development

### Modern TypeScript Stack

```typescript
import {
  createSolanaRpc,
  sendAndConfirmTransaction,
  getComputeUnitEstimate,
} from "@solana/kit";

// Always simulate first
const simulation = await rpc.simulateTransaction(transaction);
const estimatedCUs = simulation.value.unitsConsumed;

// Set CU limit to 1.2x estimate
const computeBudgetIx = getSetComputeUnitLimitInstruction({
  units: Math.ceil(estimatedCUs * 1.2),
});

// Add priority fee during congestion
const priorityFeeIx = getSetComputeUnitPriceInstruction({
  microLamports: 1000n,
});
```

### Client Generation (Codama)

```bash
# Generate typed clients from Anchor IDL (Kinobi was renamed to Codama)
npx codama generate --from anchor-idl.json --to ./generated

# Install dependencies
yarn add @solana/kit codama @codama/renderers-js @codama/nodes-from-anchor
```

### Transaction Best Practices

1. **Simulate before sending** - catch errors early, get accurate CU estimate
2. **Set compute unit limit** - 1.2x simulated usage
3. **Add priority fees** - required during congestion
4. **Use versioned transactions** - enables address lookup tables
5. **Implement retry logic** - exponential backoff for transient failures

### Transaction Landing Strategies

For high-priority or time-sensitive transactions:

```typescript
import { ComputeBudgetProgram } from "@solana/web3.js";

// 1. Get accurate CU estimate via simulation
const simulation = await connection.simulateTransaction(tx);
const estimatedCUs = simulation.value.unitsConsumed || 200_000;

// 2. Set CU limit (slightly above estimate)
const cuLimitIx = ComputeBudgetProgram.setComputeUnitLimit({
  units: Math.ceil(estimatedCUs * 1.2),
});

// 3. Set priority fee based on network conditions
const priorityFeeIx = ComputeBudgetProgram.setComputeUnitPrice({
  microLamports: 10_000, // Adjust based on congestion
});

// 4. Add both instructions at the START of transaction
tx.instructions = [cuLimitIx, priorityFeeIx, ...tx.instructions];
```

**Advanced Options:**
| Method | Best For | Notes |
| ------ | -------- | ----- |
| Priority Fees | General use | Basic congestion handling |
| Stake-Weighted QoS | Latency-critical | Most effective for speed |
| Jito Bundles | MEV protection | Guaranteed inclusion, atomic execution |
| Dynamic Slippage | DEX swaps | Auto-adjust tolerance (Jupiter) |

---

## Deployment

### Pre-Deployment Checklist

- [ ] All tests passing (unit + integration)
- [ ] Security self-audit complete (see Security section)
- [ ] Compute units optimized (simulate all instructions)
- [ ] No hardcoded addresses or keys
- [ ] Error messages are descriptive
- [ ] Events emitted for important state changes

### Environment Requirements (2026)

```toml
# Cargo.toml
[dependencies]
anchor-lang = "0.32"      # Latest: 0.32.1
solana-program = "3.0"    # SDK v3
pinocchio = "0.10"        # Latest: 0.10.0
steel = "4.0"             # Latest: 4.0.2

[dev-dependencies]
mollusk-svm = "0.7"       # Latest: 0.7.2
litesvm = "0.6"           # Latest: 0.6.1
trident-fuzz = "0.2"      # For fuzz testing
```

```
Solana CLI: 3.1.0+ (via agave-install)
Rust: 1.79.0+ (stable)
Anchor CLI: 0.32.0+ (if using Anchor)
```

**Block Limits:** 60M CUs per block (100M proposed)

### Deployment Commands

```bash
# Build
anchor build  # or cargo build-sbf

# Deploy to devnet (safe for testing)
solana program deploy target/deploy/program.so \
    --url devnet \
    --with-compute-unit-price 1000

# MAINNET - REQUIRES EXPLICIT USER CONFIRMATION
# Ask user before running this command
solana program deploy target/deploy/program.so \
    --url mainnet-beta \
    --with-compute-unit-price 5000
```

---

## Security Checklist

### Account Security

- [ ] Owner check on every account before read/write
- [ ] Signer verification for privileged operations
- [ ] PDA derived with canonical bump (stored, not recalculated)
- [ ] Account discriminator validated (prevents type confusion)
- [ ] No PDA seed collisions between different account types

### Arithmetic Security

- [ ] All math uses `checked_*` or `saturating_*` operations
- [ ] Division checks for zero divisor
- [ ] Casting uses `try_into()` with error handling
- [ ] Token amounts use u64, not floating point

### CPI Security

- [ ] Invoked program ID is verified before CPI
- [ ] Signer privileges not forwarded blindly
- [ ] Returned accounts validated after CPI
- [ ] Reentrancy considered (state committed before CPI)

### Data Security

- [ ] All instruction data validated before use
- [ ] Account data size verified matches expected
- [ ] Strings/vectors have length limits
- [ ] Rent-exempt balance maintained

---

## Known Attack Vectors

### Type Cosplay / Discriminator Attacks

Accounts can be deserialized into wrong types if they have the same size:

```rust
// VULNERABLE - no discriminator check
let user_data = User::try_from_slice(&account.data.borrow())?;

// SECURE - Anchor handles discriminators automatically
pub user: Account<'info, User>,  // Checks 8-byte discriminator

// SECURE - Native: manually verify discriminator
let data = account.data.borrow();
if data[0..8] != User::DISCRIMINATOR {
    return Err(ProgramError::InvalidAccountData);
}
```

**IDL Buffer Attack:** Anyone can create accounts owned by your program with arbitrary contents via `IdlCreateBuffer`. Always validate discriminators.

### Account Closing & Revival Attacks

Attacker can refund rent in same transaction to prevent garbage collection:

```rust
// VULNERABLE - account can be revived
**dest_account.lamports.borrow_mut() = account.lamports();
**account.lamports.borrow_mut() = 0;

// SECURE - zero data AND set closed discriminator
let dest_starting_lamports = dest_account.lamports();
**dest_account.lamports.borrow_mut() = dest_starting_lamports
    .checked_add(account.lamports())
    .unwrap();
**account.lamports.borrow_mut() = 0;

let mut data = account.data.borrow_mut();
data.fill(0);  // Zero all data
data[0..8].copy_from_slice(&CLOSED_ACCOUNT_DISCRIMINATOR);

// ANCHOR - use close constraint (handles everything)
#[account(mut, close = destination)]
pub account_to_close: Account<'info, MyAccount>,
```

### Arbitrary CPI (Confused Deputy)

Programs can invoke any program - attackers pass malicious programs:

```rust
// VULNERABLE - no program ID validation
invoke(&instruction, accounts)?;

// SECURE - validate target program
if instruction.program_id != spl_token::ID {
    return Err(ProgramError::IncorrectProgramId);
}
invoke(&instruction, accounts)?;

// ANCHOR - CPI modules validate automatically
token::transfer(cpi_ctx, amount)?;
```

### Missing Reload After CPI

Anchor doesn't auto-refresh account states after CPI:

```rust
// VULNERABLE - stale data after CPI
token::transfer(cpi_ctx, amount)?;
// source_account still has old balance in memory!

// SECURE - reload after CPI
token::transfer(cpi_ctx, amount)?;
ctx.accounts.source_account.reload()?;
```

### PDA Bump Seed Attacks

User-provided bumps allow multiple PDAs per seed:

```rust
// VULNERABLE - accepts any bump
let pda = Pubkey::create_program_address(
    &[seed, &[user_provided_bump]],  // Attacker controls bump!
    program_id
)?;

// SECURE - always use canonical bump
let (pda, canonical_bump) = Pubkey::find_program_address(&[seed], program_id);

// BEST - store bump on init, reuse for performance
#[account]
pub struct Vault {
    pub authority: Pubkey,
    pub bump: u8,  // Store canonical bump at initialization
}
```

**Seed Collision Prevention:**
- Use unique prefixes: `b"user_vault"`, `b"admin_config"`
- Include unique identifiers (user pubkey, nonce)
- Never share PDAs across authority domains

---

## Common AI Mistakes

### Outdated Libraries

```rust
// WRONG - outdated, larger binary, more CUs
use solana_program::account_info::AccountInfo;
use solana_program::entrypoint;

// CORRECT - modern (2025)
use pinocchio::account_info::AccountInfo;
use pinocchio::entrypoint;
// OR use Anchor
use anchor_lang::prelude::*;
```

### Missing Validation

```rust
// WRONG - no validation
pub fn transfer(ctx: Context<Transfer>, amount: u64) -> Result<()> {
    let source = &mut ctx.accounts.source;
    source.balance -= amount;  // No checks!
    Ok(())
}

// CORRECT - full validation
pub fn transfer(ctx: Context<Transfer>, amount: u64) -> Result<()> {
    let source = &mut ctx.accounts.source;
    require!(source.balance >= amount, ErrorCode::InsufficientFunds);
    source.balance = source.balance.checked_sub(amount)
        .ok_or(ErrorCode::Overflow)?;
    Ok(())
}
```

### Unsafe Unwrap

```rust
// WRONG - panics on error
let data = account.data.borrow();
let parsed: MyStruct = MyStruct::try_from_slice(&data).unwrap();

// CORRECT - propagates error
let data = account.data.borrow();
let parsed = MyStruct::try_from_slice(&data)
    .map_err(|_| ErrorCode::InvalidAccountData)?;
```

### Hardcoded Values

```rust
// WRONG - hardcoded
const ADMIN: Pubkey = pubkey!("ABC123...");

// CORRECT - configurable
#[account]
pub struct Config {
    pub admin: Pubkey,
    pub bump: u8,
}
```

---

## Quick Reference

### Compute Unit Costs (Approximate)

| Operation              | CUs                  |
| ---------------------- | -------------------- |
| Basic instruction      | 200                  |
| Signature verification | 720                  |
| Write lock (per acct)  | 300                  |
| Pubkey creation        | 1,500                |
| SHA256 hash            | 100 per 64 bytes     |
| Account creation       | 2,000                |
| CPI call (system xfer) | ~2,215 + callee CUs  |
| Logging (msg!)         | 100+ per call        |
| find_program_address   | 1,500+ (iterative)   |

### CU Optimization Techniques

```rust
// EXPENSIVE - logging in production
msg!("Transfer {} tokens from {} to {}", amount, source, dest);

// CHEAP - remove logs or use feature flag
#[cfg(feature = "debug")]
msg!("Transfer {} tokens", amount);

// EXPENSIVE - find_program_address on-chain (iterates bumps)
let (pda, bump) = Pubkey::find_program_address(&[seed], program_id);

// CHEAP - use stored bump (no iteration)
let pda = Pubkey::create_program_address(&[seed, &[stored_bump]], program_id)?;

// EXPENSIVE - full deserialization
let account_data = MyAccount::try_from_slice(&data)?;

// CHEAP - zero-copy access (Anchor)
#[account(zero_copy)]
pub struct LargeAccount { /* saves 50%+ CUs */ }

// CHEAP - zero-copy access (Pinocchio)
let data = unsafe { &*(data.as_ptr() as *const MyAccount) };
```

**CU Benchmarking:**
```rust
use solana_program::log::sol_log_compute_units;

sol_log_compute_units();  // Log CU at this point
// ... your code ...
sol_log_compute_units();  // Compare to see cost
```

### Transaction Limits

- Max transaction size: 1,232 bytes
- Max accounts per tx: 64 (with lookup tables: 256)
- Max compute units: 1,400,000 (requestable)
- Default compute units: 200,000

### RPC Providers

For production, use paid RPC providers:

- Helius, QuickNode, Triton, Alchemy
- Free tiers will fail under load
- Budget $100-300/month for production apps

---

## Security Audit Preparation

Run this checklist before submitting for audit:

### Automated Tools

```bash
# Fuzz testing (finds edge cases)
cargo install trident-cli
trident init && trident fuzz run

# Static analysis
cargo install soteria
soteria .

# Dependency audit
cargo audit
```

### Manual Review Checklist

- [ ] All PDAs use canonical bumps (stored, not recalculated)
- [ ] All CPIs validate target program ID
- [ ] Account closing zeroes data AND sets closed discriminator
- [ ] No type cosplay vulnerabilities (discriminators checked)
- [ ] All arithmetic uses checked_*/saturating_* operations
- [ ] No signer privileges forwarded blindly in CPIs
- [ ] Accounts reloaded after CPIs that modify them
- [ ] All error paths tested, not just happy paths
- [ ] No hardcoded addresses (use config accounts)
- [ ] Rent-exempt balance verified on account creation

### Common Audit Findings

| Finding | Prevention |
| ------- | ---------- |
| Missing owner check | Always verify `account.owner == expected` |
| Integer overflow | Use `checked_add`, `checked_sub`, etc. |
| PDA seed collision | Use unique prefixes per account type |
| Unclosed account revival | Zero data + closed discriminator |
| Arbitrary CPI | Hardcode or validate program IDs |
