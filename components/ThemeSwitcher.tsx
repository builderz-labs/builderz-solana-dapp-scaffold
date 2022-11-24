import React from "react";
import ThemeSwitch from "./ThemeSwitch";

interface Props {
  toggleTheme(): void;
}

const ThemeSwitcher: React.FC<Props> = ({ toggleTheme }) => {
  return <ThemeSwitch onClick={toggleTheme} />;
};

export default ThemeSwitcher;
