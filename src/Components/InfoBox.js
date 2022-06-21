import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import "./infobox.css";
function InfoBox({ title, cases, total, color, ...props }) {
  return (
    <div className="infobox__container">
      <Card className="infobox" onClick={props.onClick}>
        <CardContent>
          <Typography className="infobox__title" variant="h5" color={color}>
            {title}
          </Typography>
          <Typography className="infobox__cases" variant="h6" color={color}>
            {cases}
          </Typography>
          <Typography className="infobox__total" variant="h6" color={color}>
            {total}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default InfoBox;
