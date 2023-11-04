import { Box, ButtonBase, Stack } from "@mui/material";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import { startTransition } from 'react';
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function NavbarItens(props){
    const {item, isVisible} = props
    const location = useLocation();
    const navegacao = useNavigate();
    const [subnav, setSubnav] = useState(false);

    const handleClick = (path, submenu) => {
        submenu ? setSubnav(!subnav) : startTransition(() => {
          navegacao(path);
        })
      }

    return (
        <li className="list-none">
            <ButtonBase 
                sx={{
                    alignItems: 'center',
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    width: '100%',
                    listStyle: 'none',
                }}
                className={`
                    hover:bg-blue-fut-paz-900 p-3 mb-1 
                    ${location.pathname == item.caminho ? 'bg-blue-fut-paz-900 text-white' : 'text-gray-400'}`
                }
                onClick={() => {
                    handleClick(item.caminho, item.submenu)
                }}
            > 
                {item.icone && (
                    <Box 
                        component="span"
                        sx={{
                            alignItems: 'center',
                            color: 'neutral.400',
                            display: 'inline-flex',
                            justifyContent: 'center',
                            mr: 2,
                        }}
                        className={`${!isVisible ? 'p-2' : ''} 
                            ${location.pathname == item.caminho ? 'bg-blue-fut-paz-900 text-red-500' : 'text-gray-400'}`
                        }>
                        {item.icone}
                        {!isVisible && item.submenu && (<ArrowDropDownIcon className={`absolute top-8 ${subnav ? "rotate-180 duration-500" : ""}`} />)}
                    </Box>
                )}
                <Box 
                    component="span" 
                    sx={{
                        color: 'neutral.400',
                        flexGrow: 1,
                        fontFamily: (theme) => theme.typography.fontFamily,
                        fontSize: 18,
                        fontWeight: 600,
                        lineHeight: '24px',
                        whiteSpace: 'nowrap',
                    }}
                    className={`${!isVisible ? 'hidden' : ''}`}
                >
                    {isVisible && (
                        <h1 className='text-md font-sora'>
                            {item.titulo}
                            {item.submenu ? 
                                <ArrowForwardIosIcon 
                                    className={`absolute left-52 w-20 
                                        ${subnav ? "rotate-90 duration-500" : ""}
                                    `} 
                                />
                            : ''}
                        </h1>
                    )}
                </Box>
            </ButtonBase>


            <Stack 
                component="ul"
                spacing={0.5}
                sx={{
                    listStyle: 'none',
                    p: 0,
                    m: 0
                }}
            >
                {subnav &&
                    item.submenu.map((subItem, index) => {
                        return (
                            <ButtonBase 
                                className={`flex justify-start p-3 w-full rounded
                                    text-gray-400 text-sm hover:bg-blue-fut-paz-900
                                    ${location.pathname == subItem.caminho ? 
                                        "bg-blue-fut-paz-900 border-teal-300 border-8" 
                                        : ''
                                    }
                                    ${subnav ? "duration-300" : ""}
                                    ${isVisible ? "pl-10" : ""}`
                                }
                                onClick={() => {
                                    startTransition(() => {
                                        navegacao(subItem.caminho)
                                    });
                                }}
                                key={index}
                            >

                                {subItem.icone && (
                                <Box
                                    component="span"
                                    sx={{
                                    alignItems: 'center',
                                    color: 'neutral.400',
                                    display: 'inline-flex',
                                    justifyContent: 'center',
                                    mr: 2,
                                    }}
                                    className={`
                                        'text-gray-400'
                                        ${location.pathname == subItem.caminho ? 
                                            "text-red-500" 
                                            : ''
                                        }
                                        ${!isVisible ? 'p-2' : ''}
                                    `}
                                >
                                    {subItem.icone}
                                </Box>
                                )}

                                {isVisible && (<h1 className={`${location.pathname == subItem.caminho ? 'text-white ' : ''}`}>{subItem.titulo}</h1>)}
                            </ButtonBase>
                        );
                    })
                }
            </Stack>
        </li>
    )
}