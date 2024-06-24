// type StyledDefType = Object | ((theme: any, props: any) => Object);

// /**
//  * makeStyles from tss-react but with same syntax as the one from mui v4
//  * @param styleDef
//  * @returns
//  */
// export const makeStyles = <TTheme, TProps = any>(
//   styleDef: StyledDefType
// ): ((props?: TProps) => any) => {
//   // @ts-ignore
//   const rawUseStyles = rawMakeStyles()(styleDef);
//   // useStyle syntax also is slightly different in tss-react, because
//   // it returns more than classes. But we only use classes here.
//   const useStyles = (...args: any) => {
//     const { classes } = rawUseStyles(...args);
//     return classes;
//   };
//   return useStyles;
// };
