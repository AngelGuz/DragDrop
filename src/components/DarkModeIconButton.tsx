import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";

export function DarkModeIconButton({...rest}: React.ComponentPropsWithRef<typeof IconButton>){
    const { colorMode, toggleColorMode } = useColorMode();
    
    const isDark = colorMode === 'dark';

    return(
        <IconButton
            onClick={toggleColorMode}
            icon={isDark?<MoonIcon/>:<SunIcon/>}
            aria-label={'dark-mode-toggle'}
            {...rest}
        />
    )
}