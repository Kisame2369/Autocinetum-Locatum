
export const customSelectStylesBrand = {
    control: (provided) => ({
        ...provided,
        width: '204px',
        height: '44px',
        border: 'none',
        borderRadius: '12px',
        backgroundColor: 'var(--dark-white)',
        boxShadow: 'none',
        padding: '0 8px 0 16px',
        fontFamily: 'Manrope, sans-serif',
        fontWeight: '500',
        fontSize: '16px',
        lineHeight: '20px',
        color: 'var(--black)',
        caretColor: 'transparent',
        '&:hover': {
            border: 'none'
        },
        cursor: 'pointer',
    }),
    
    valueContainer: (provided) => ({
        ...provided,
        padding: '0'
    }),

    placeholder: (provided) => ({
        ...provided,
        margin: '0',
        fontFamily: 'Manrope, sans-serif',
        fontWeight: '500',
        fontSize: '16px',
        lineHeight: '20px',
        color: 'var(--black)'
    }),

    indicatorSeparator: () => ({
        display: 'none'
    }),

    dropdownIndicator: (provided, state) => ({
        ...provided,
        padding: '8px',
        '& svg': {
            display: 'none' 
        },
        '&::after': {
            content: '""',
            width: '16px',
            height: '16px',
            backgroundImage: 'url("../../../public/arrow.svg")',  
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            display: 'block',
            transform: state.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease'
        }
    }),
    menu: (provided) => ({
        ...provided,
        marginTop: '4px',
        borderRadius: '12px',
        border: '1px solid var(--dark-white)',
        width: '204px',
        backgroundColor: 'var(--white)',
        overflow: 'hidden',
        boxShadow: '0px 4px 36px 0px rgba(0, 0, 0, 0.02)'
    }),
    menuList: (provided) => ({
        ...provided,
        padding: '6px 0px 6px 18px',
        maxHeight: '272px',
        position: 'relative',
        '::-webkit-scrollbar': {
            width: '8px',
            
        },
        '::-webkit-scrollbar-thumb': {
            backgroundColor: 'var(--light-gray)',
            borderRadius: '10px',
        }
    }),
    option: (provided, state) => ({
        ...provided,
        fontFamily: 'Manrope, sans-serif',
        fontWeight: '500',
        fontSize: '16px',
        lineHeight: '20px',
        color: state.isFocused ? 'var(--black)' : 'var(--gray)',
        backgroundColor: 'transparent',
        borderRadius: '8px',
        padding: '8px 0px',
        cursor: 'pointer',
        ':active': {
        backgroundColor: 'transparent' 
    },
    })
};

export const customSelectStylesPrice = {
        control: (provided) => ({
        ...provided,
        width: '196px',
        height: '44px',
        border: 'none',
        borderRadius: '12px',
        backgroundColor: 'var(--dark-white)',
        boxShadow: 'none',
        padding: '0 8px 0 16px',
        fontFamily: 'Manrope, sans-serif',
        fontWeight: '500',
        fontSize: '16px',
        lineHeight: '20px',
        color: 'var(--black)',
        caretColor: 'transparent',
        '&:hover': {
            border: 'none'
        },
        cursor: 'pointer',
    }),
    valueContainer: (provided) => ({
        ...provided,
        padding: '0'
    }),

    placeholder: (provided) => ({
        ...provided,
        margin: '0',
        fontFamily: 'Manrope, sans-serif',
        fontWeight: '500',
        fontSize: '16px',
        lineHeight: '20px',
        color: 'var(--black)'
    }),

    indicatorSeparator: () => ({
        display: 'none'
    }),

    dropdownIndicator: (provided, state) => ({
        ...provided,
        padding: '8px',
        '& svg': {
            display: 'none' 
        },
        '&::after': {
            content: '""',
            width: '16px',
            height: '16px',
            backgroundImage: 'url("../../../public/arrow.svg")', 
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            display: 'block',
            transform: state.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease'
        }
    }),
    menu: (provided) => ({
        ...provided,
        marginTop: '4px',
        borderRadius: '12px',
        border: '1px solid var(--dark-white)',
        width: '196px',
        backgroundColor: 'var(--white)',
        overflow: 'hidden',
        boxShadow: '0px 4px 36px 0px rgba(0, 0, 0, 0.02)'
    }),
    menuList: (provided) => ({
        ...provided,
        padding: '6px 0px 6px 18px',
        maxHeight: '188px',
        position: 'relative',
        '::-webkit-scrollbar': {
            width: '8px',
            
        },
        '::-webkit-scrollbar-thumb': {
            backgroundColor: 'var(--light-gray)',
            borderRadius: '10px',
        }
    }),
    option: (provided, state) => ({
        ...provided,
        fontFamily: 'Manrope, sans-serif',
        fontWeight: '500',
        fontSize: '16px',
        lineHeight: '20px',
        color: state.isFocused ? 'var(--black)' : 'var(--gray)',
        backgroundColor: 'transparent',
        borderRadius: '8px',
        padding: '8px 0px',
        cursor: 'pointer',
        ':active': {
        backgroundColor: 'transparent' 
    },
    })
};
