import { AiOutlineLike } from "react-icons/ai";
import { PiFlowerTulip } from "react-icons/pi";
import { IoIosPeople } from "react-icons/io";
import { PiMedalLight } from "react-icons/pi";
interface CardData {
    icon: React.ReactNode;
    title: string;
    value: string;
    description: string;
    text:string
}

export const claimCardData: CardData[] = [
    {
        icon: <AiOutlineLike size={24} />,
        title: "Impact",
        value: "High",
        text:`<4/5>`,
        description: "Studies suggest that regular sauna use can lower the risk of heart disease by up to 40%.",
    },
    {
        icon: <PiFlowerTulip size={24} />,
        title: "Maturity",
        value: "High",
        text:`<4/5>`,
        description: "The research is well established, with studies spanning several decades.",
    },
    {
        icon: <IoIosPeople size={24} />,
        title: "Consensus",
        value: "Moderate",
        text:`<3/5>`,
        description: "While many studies support this, there is moderate variability in the results.",
    },
    {
        icon: <PiMedalLight size={24} />,
        title: "Overall Evidence Rating",
        value: "Strong",
        text:`<4/5>`,
        description: "While many studies support this, there is moderate variability in the results.",
    },
];