import React from "react";
import { Form } from "react-bootstrap";
import { Operator } from "./ChooseButton";

type ShowOperatorFrameProps = {
  selectedOperators: Operator[];
};

export default function ShowOperatorFrame({ selectedOperators = [] }: ShowOperatorFrameProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "10px",
      }}
    >
      {[0, 1, 2].map((index) => {
        const operator = selectedOperators?.[index];

        return (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid black",
              padding: "10px",
              backgroundColor: operator ? "white" : "#f0f0f0",
            }}
          >
            {operator ? (
              <Form>
                <div style={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "center" }}>
                  <Form.Group controlId={`operator-${index}`}>
                    <Form.Label style={{ margin: 0 }}>{'★' + operator.rank}</Form.Label>
                    <Form.Label style={{ margin: 0 }}>{operator.classType}</Form.Label>
                    <Form.Label style={{ margin: 0 }}>{operator.name}</Form.Label>
                  </Form.Group>
                </div>
              </Form>
            ) : (
              <div
                style={{
                  color: "#888",
                  fontStyle: "italic",
                  fontSize: "14px",
                }}
              >
                未選択
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}