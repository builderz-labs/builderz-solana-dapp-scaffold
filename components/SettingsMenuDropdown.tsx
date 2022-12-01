import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ContentCut, ContentCopy, ContentPaste, Cloud } from '@mui/icons-material';
import { Paper, MenuList, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ThemeSwitcherComponent from './ThemeSwitcher';

export default function BasicMenu({ setTheme }: any) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <SettingsIcon />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <Paper >
                    <MenuList>
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <Divider />
                        <MenuItem>
                            <ThemeSwitcherComponent useOs={false} themeChanger={setTheme} />
                        </MenuItem>
                    </MenuList>
                </Paper>
            </Menu>
        </div>
    );
}
