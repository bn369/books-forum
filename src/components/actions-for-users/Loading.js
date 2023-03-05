import React from "react";
import { Spinner } from "react-bootstrap";

export function Loading({ centered = false }) {
  return (
    <div style={{ textAlign: centered ? 'center' : undefined }}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
