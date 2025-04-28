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
        {[...Array(11).keys()].map((num) => (
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
          display: "flex",  // Flexboxを使用して横並びに
          flexDirection: "row", // 横並び
          gap: "10px",  // ドロップダウン間の間隔
          justifyContent: "space-between",  // 横並びで間隔を均等に
        }}
      >
        {["★1", "★2", "★3", "★4", "★5", "★6"].map((label, i) => (
          <div style={{ width: "100px" }} key={label}>  {/* 幅を固定 */}
            <RankDropdown
              key={label}
              label={label}
              value={hopeCosts[i]}
              onChange={(val) => handleHopeCostChange(i, val)}
            />
          </div>
        ))}
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