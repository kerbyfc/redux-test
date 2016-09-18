import * as React from "react";
import "react-dom";

interface IFooterProps extends React.Attributes {
}

/**
 * Render footer container.
 *
 * @return {JSX.Element} Rendered footer container.
 */
export const Footer = (props:IFooterProps) => (
    <footer className="footer"></footer>
);

export default Footer;
