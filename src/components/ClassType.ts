export enum ClassType {
    Vanguard = "先鋒",
    Guard = "前衛",
    Defender = "重装",
    Sniper = "狙撃",
    Caster = "術師",
    Medic = "医療",
    Supporter = "補助",
    Specialist = "特殊",
}

export const ClassType2Enum = (label: string): ClassType => {
    const entry = Object.entries(ClassType).find(
        ([_, value]) => value === label
    );
    return entry ? (ClassType as any)[entry[0]] : ClassType.Vanguard;
};

export const ClassTypeList: string[] = Object.values(ClassType);