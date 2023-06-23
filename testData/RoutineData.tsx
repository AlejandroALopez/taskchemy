import { Routine } from '@/types/RoutineTypes';

const routineData: Routine[] = [
    {
        id: "100",
        title: "Sleep 8 hours",
        description: "",
        frequency: [false, false, false, false, false, false, false],
        daysFollowed: 0
    },
    {
        id: "200",
        title: "Do 1 hour of exercise",
        description: "",
        frequency: [true, false, true, false, false, false, false],
        daysFollowed: 4
    },
    {
        id: "300",
        title: "Do 1 hour of AWS course",
        description: "",
        frequency: [true, true, true, true, true, true, true],
        daysFollowed: 5
    }
];

export default routineData;