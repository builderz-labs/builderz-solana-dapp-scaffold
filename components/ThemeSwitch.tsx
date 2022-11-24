import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import Switch from "@mui/material/Switch";

interface Props {
  onClick(): void;
}

const SwitchComp: React.FC<Props> = ({ onClick }) => {
  const [checked, setCheked] = React.useState(false);
  const { colors } = useContext(ThemeContext);

  const handleChange = (event: any) => {
    setCheked(!checked);
  };

  return (
    <Switch
      color={colors.secondary}
      checked={checked}
      onClick={onClick}
      onChange={handleChange}
      inputProps={{ "aria-label": "secondary checkbox" }}
    />
  );
};

export default SwitchComp;
