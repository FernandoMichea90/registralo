import { Box, Modal } from '@mui/material'
import { Emoji, EmojiStyle } from 'emoji-picker-react'
import React from 'react'
import LoadingButton from 'src/theme/overrides/LoadingButton'
const RegistroModal = ({ open = true,registro ,cancelar }) => {
    const [cargando,setCargando]=React.useState(false)
    return (
        <Modal open={open} >
            <div>
                <h1>¿Estas seguro que deseas borrar el registro?</h1>
            </div>
            <p>
                <Emoji unified={registro.icono} size={22} emojiStyle={EmojiStyle.APPLE}></Emoji><span style={{margin:"0 5px"}}>{registro.titulo}</span>
            </p>
            <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
                {/* <Button variant="outlined" color="inherit" onClick={Cancelar}>
                    Cancelar
                </Button> */}
                <LoadingButton></LoadingButton>
            </Box>
        </Modal>
    )
}
export default RegistroModal