// import { makeStyles } from "@/libs/mui/makeStyles";
import { alpha, Chip, Theme } from "@mui/material";
import React, { FC } from "react";

// const useStyles = makeStyles<Theme>((theme) => ({
//   groupRoot: {
//     border: "1px solid",
//     borderRadius: "50px",
//     borderColor: "#BCCCDC",
//     backgroundColor: "white",
//     padding: 4,
//     display: "inline-block",
//   },
//   buttonRoot: {
//     border: "unset",
//     borderRadius: "50px",
//     backgroundColor: "white",
//     "&:hover, &:focus, &:active": {
//       backgroundColor: alpha("#334E68", theme.palette.action.hoverOpacity),
//     },
//   },
//   buttonClickable: {
//     boxShadow: "none",
//     "&:active": {
//       boxShadow: "none",
//     },
//   },
//   buttonClickableSelected: {
//     backgroundColor: "#334E68",
//     color: "white",
//     "&:hover, &:focus, &:active": {
//       backgroundColor: "#334E68",
//     },
//   },
// }));

export interface SwitchProps {
  value: string;
  setValue?: (value: string) => void;
  options: SwitchOption[];
  rootClassName?: string;
  disabled?: boolean;
}

export interface SwitchOption {
  value: string;
  label?: string;
}

const Switch: FC<SwitchProps> = ({
  value: currentValue,
  setValue: setCurrentValue,
  options,
  rootClassName,
  disabled,
}) => {
  //   const classes = useStyles();

  return (
    <>
      {options.map(({ label, value }) => (
        <Chip
          disabled={disabled || !setCurrentValue}
          clickable={true} // even if onCLick is not defined, we need this to get the right styling
          size="small"
          key={value}
          label={label}
          // classes={{
          //   root: classes.buttonRoot,

          //   clickable: clsx(
          //     classes.buttonClickable,
          //     value === currentValue && classes.buttonClickableSelected
          //   ),
          // }}
          aria-selected={value === currentValue}
          onClick={setCurrentValue ? () => setCurrentValue(value) : undefined}
        />
      ))}
    </>
  );
};

// const Switch: FC<SwitchProps> = ({
//   value: currentValue,
//   setValue: setCurrentValue,
//   options,
//   rootClassName,
//   disabled,
// }) => {
//   const classes = useStyles();

//   return (
//     <>
//       {options.map(({ label, value }) => (
//         <Chip
//           disabled={disabled || !setCurrentValue}
//           clickable={true} // even if onCLick is not defined, we need this to get the right styling
//           size="small"
//           key={value}
//           label={label}
//           classes={{
//             root: classes.buttonRoot,

//             clickable: clsx(
//               classes.buttonClickable,
//               value === currentValue && classes.buttonClickableSelected
//             ),
//           }}
//           aria-selected={value === currentValue}
//           onClick={setCurrentValue ? () => setCurrentValue(value) : undefined}
//         />
//       ))}
//     </>
//   );
// };

export default Switch;
