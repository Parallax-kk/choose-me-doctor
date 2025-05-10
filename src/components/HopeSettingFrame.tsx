import { useEffect, useState } from "react";
import { Dropdown, DropdownButton, InputGroup, Table } from "react-bootstrap";

interface HopeSettingFrameProps {
  setInitialHope: (initialHope: number) => void;
  setHopeCosts: (costs: number[]) => void;
}

type RankDropdownProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
};

const RankDropdown = ({ label, value, onChange }: RankDropdownProps) => {
  const handleSelect = (eventKey: string | null) => {
    if (eventKey !== null) {
      onChange(Number(eventKey));
    }
  };

  return (
    <InputGroup>
      <InputGroup.Text>{label}</InputGroup.Text>
      <DropdownButton id={`dropdown-${label}`} title={value.toString()} onSelect={handleSelect}>
        {[...Array(10).keys()].map((num) => (
          <Dropdown.Item eventKey={num.toString()} key={num}>
            {num}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </InputGroup>
  );
};

export default function HopeSettingFrame({ setInitialHope, setHopeCosts }: HopeSettingFrameProps) {
  const [initialHope, setInitialHopeState] = useState<number>(0);
  const [hopeCosts, setHopeCostsState] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  const handleInitialHopeSelect = (eventKey: string | null) => {
    if (eventKey !== null) {
      const value = Number(eventKey);
      setInitialHopeState(value);
      setInitialHope(value);
    }
  };

  const handleHopeCostChange = (index: number, value: number) => {
    const updated = [...hopeCosts];
    updated[index] = value;
    setHopeCostsState(updated);
    setHopeCosts(updated);
  };

  useEffect(() => {
    setHopeCostsState([0, 0, 0, 0, 2, 6]);
    setHopeCosts([0, 0, 0, 0, 2, 6]);
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gap: "10px",
        padding: "10px",
        border: "1px solid black",
        marginBottom: "10px",
      }}
    >
      <h5>所持希望</h5>
      <InputGroup>
        <DropdownButton
          id="dropdown-hope"
          title={initialHope.toString()}
          onSelect={handleInitialHopeSelect}
        >
          {[...Array(21).keys()].map((num) => (
            <Dropdown.Item eventKey={num.toString()} key={num}>
              {num}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </InputGroup>

      <h5>消費希望</h5>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          justifyContent: "space-between",
        }}>
        <Table borderless={true} style={{ tableLayout: "auto", width: "auto" }}>
          <thead>
            <tr>
              <th >
                <RankDropdown
                  key={"★1"}
                  label={"★1"}
                  value={hopeCosts[0]}
                  onChange={(val) => handleHopeCostChange(0, val)}
                />
              </th>
              <th >
                <RankDropdown
                  key={"★2"}
                  label={"★2"}
                  value={hopeCosts[1]}
                  onChange={(val) => handleHopeCostChange(1, val)}
                />
              </th>
              <th >
                <RankDropdown
                  key={"★3"}
                  label={"★3"}
                  value={hopeCosts[2]}
                  onChange={(val) => handleHopeCostChange(2, val)}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <RankDropdown
                  key={"★4"}
                  label={"★4"}
                  value={hopeCosts[3]}
                  onChange={(val) => handleHopeCostChange(3, val)}
                />
              </td>
              <td>
                <RankDropdown
                  key={"★5"}
                  label={"★5"}
                  value={hopeCosts[4]}
                  onChange={(val) => handleHopeCostChange(4, val)}
                />
              </td>
              <td>
                <RankDropdown
                  key={"★6"}
                  label={"★6"}
                  value={hopeCosts[5]}
                  onChange={(val) => handleHopeCostChange(5, val)}
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div >
        <Table bordered size="sm" style={{
          fontSize: "0.8rem", tableLayout: "auto", width: "auto",
        }}
        >
          <thead>
            <tr>
              <th ></th>
              <th >★1</th>
              <th >★2</th>
              <th >★3</th>
              <th >★4</th>
              <th >★5</th>
              <th >★6</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>サルカズの炉辺奇談</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>2</td>
              <td>6</td>
            </tr>
            <tr>
              <td>その他</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>2</td>
              <td>3</td>
              <td>6</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}