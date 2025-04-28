import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { ClassType, ClassType2Enum, ClassTypeList } from "./ClassType";

interface SelectClassFrameProps {
    setSelectedClass: (value: ClassType[]) => void;
};

const OperatorDropdown: React.FC<{
    index: number;
    selected: string;
    onSelect: (value: string) => void;
}> = ({ index, selected, onSelect }) => {

    return (
        <Dropdown
            onSelect={(eventKey) => {
                if (eventKey !== null) {
                    onSelect(eventKey);
                }
            }}
            style={{ flex: 1 }}>
            <Dropdown.Toggle
                id="dropdown-basic"
                style={{
                    width: "100%",
                    minHeight: "38px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0 10px",
                }}
            >
                <span style={{ flex: 1, textAlign: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {selected || `${index + 1}人目`}
                </span>
                <span style={{ marginLeft: "10px" }} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {ClassTypeList.map((classType: string, index: number) => (
                    <Dropdown.Item key={index} eventKey={classType}>
                        {classType}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default function SelectClassFrame({ setSelectedClass }: SelectClassFrameProps) {
    const [selectedClass, setSelectionsClassState] = useState<ClassType[]>([ClassType.Vanguard, ClassType.Vanguard, ClassType.Vanguard]);

    const handleSelect = (index: number, value: ClassType) => {
        const newSelections = [...selectedClass];
        newSelections[index] = value;
        console.log("newSelections:", newSelections);
        console.log("value:", value);
        setSelectionsClassState(newSelections);
        setSelectedClass(newSelections);
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid black",
                padding: "20px",
                marginBottom: "10px"
            }}
        >
            {/* 横並びのドロップダウン */}
            <h5>職分選択</h5>
            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "10px",
                }}
            >
                {[0, 1, 2].map((index) => (
                    <OperatorDropdown
                        key={index}
                        index={index}
                        selected={selectedClass[index]}
                        onSelect={(value) => handleSelect(index, ClassType2Enum(value))}
                    />
                ))}
            </div>
        </div>
    );
};