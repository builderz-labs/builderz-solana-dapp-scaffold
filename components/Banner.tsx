import { MegaphoneIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

import Close from 'mdi-material-ui/Close'

import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import Grow from '@mui/material/Grow'
import Alert from '@mui/material/Alert'
import Slide from '@mui/material/Slide'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import { AlertTitle } from '@mui/material'
import { RequestAirdrop } from './RequestAirdrop'



export default function Banner() {

    const [open1, setOpen1] = useState<boolean>(true)


  return (
        <Box sx={{ mb:0 }} className="w-full justify-between">
        <Collapse in={open1} >
          <Alert severity='warning' style={{ display:"flex", justifyContent:"space-between" }} className="rounded-lg m-4 bg-teal-800 mb-2 text-center text-black flex justify-between"
            action={
              <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpen1(false)}>
                <Close fontSize='inherit' />
              </IconButton>
            }
          >
            <div className="w-full flex justify-between">
            <p>We are live in Alpha on <strong>mainnet!</strong></p>    
            
              </div>     
          </Alert>
          {/* <RequestAirdrop /> */}
        </Collapse>
      </Box>
  )
}