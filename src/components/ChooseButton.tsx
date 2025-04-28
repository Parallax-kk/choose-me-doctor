import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { ClassType } from "./ClassType";
import Papa from "papaparse";

interface ChooseButtonProps {
    initialHope: number;
    rankHopeCosts: number[];
    selectedClass: ClassType[];
    setSelectedOperators: (selectedOperators: Operator[]) => void;
};


export type Operator = {
    name: string;
    rank: number;
    classType: string;
};

export default function ChooseButton({ initialHope, rankHopeCosts, selectedClass, setSelectedOperators }: ChooseButtonProps) {
    const [classTypeToOperators, setClassTypeToOperatorsState] = useState<Map<string, Operator[]>>(new Map());

    function chooseOperator() {
        if (classTypeToOperators.size === 0) {
            console.error("Operator list not loaded yet!");
            return;
        }
        console.log("selectedClass:", selectedClass);

        let currentHope = initialHope;
        const operators: Operator[] = [];

        for (const classType of selectedClass) {
            let candidates = (classTypeToOperators.get(classType) || []).filter((op) => {
                const hopeCost = rankHopeCosts[op.rank - 1];
                return hopeCost <= currentHope;
            });

            candidates = candidates.filter((op) => {
                return !operators.some((selectedOp) => selectedOp.name === op.name);
            });

            if (candidates.length === 0) {
                console.error(`currentHope ${currentHope} でクラス ${classType} のオペレーターが選べませんでした`);
                return;
            }

            let selected: Operator | null = null;

            candidates.sort((a, b) => rankHopeCosts[a.rank - 1] - rankHopeCosts[b.rank - 1]);

            while (candidates.length > 0) {
                const randomIndex = Math.floor(Math.random() * candidates.length);
                const candidate = candidates[randomIndex];

                const candidateHopeCost = rankHopeCosts[candidate.rank - 1];

                if (candidateHopeCost <= currentHope) {
                    selected = candidate;
                    currentHope -= candidateHopeCost;
                    break;
                } else {
                    const overCost = candidateHopeCost;
                    candidates = candidates.filter(op => {
                        const hopeCost = rankHopeCosts[op.rank - 1];
                        return hopeCost < overCost;
                    });
                }
            }

            if (!selected) {
                console.error(`currentHope ${currentHope} でクラス ${classType} のオペレーターが決まりませんでした`);
                return;
            }

            operators.push(selected);
            console.log(`★ ${selected.rank} ${selected.classType} ${selected.name} 消費Hope: ${rankHopeCosts[selected.rank - 1]} 残りHope: ${currentHope}`);
        }

        setSelectedOperators(operators);
        console.log("最終的な残り希望ポイント:", currentHope);
    }

    useEffect(() => {
        fetch("/data/OperatorList.csv")
            .then((response) => response.text())
            .then((csvText) => {
                const parsed = Papa.parse<string[]>(csvText, {
                    header: false,
                    skipEmptyLines: true,
                });

                const allOperators = parsed.data.map((row) => {
                    const [name, rankStr, classType] = row;
                    return {
                        name,
                        rank: parseInt(rankStr),
                        classType,
                    };
                });

                const map = new Map<string, Operator[]>();
                allOperators.forEach((op) => {
                    if (!map.has(op.classType)) {
                        map.set(op.classType, []);
                    }
                    map.get(op.classType)!.push(op);
                });

                setClassTypeToOperatorsState(map);
            });
    }, []);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                padding: "20px",
                marginBottom: "10px"
            }}
        >
            <Button variant="success" size="lg" onClick={chooseOperator}>
                Choose Me!
            </Button>
        </div>
    );
};