import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

function InfoBox({ title, cases, total }) {
  return (
    <div>
      <Card className="infobox">
        <CardContent>
          <Typography className="infobox__title" variant="h5" color="secondary">
            {title}
          </Typography>
          <Typography className="infobox__cases" variant="h6" color="secondary">
            {cases}
          </Typography>
          <Typography className="infobox__total" variant="h6" color="secondary">
            {total}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default InfoBox;
