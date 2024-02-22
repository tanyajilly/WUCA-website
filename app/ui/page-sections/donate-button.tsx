import { SUMUP_URL } from "@/app/lib/constants";

type Props = {
    buttonText: string;
};
export default function DonateButton({
    buttonText
}: Props) {
    return (
        <div
            className='p-4 flex justify-center'
        >
            <a className="btn-primary" href={SUMUP_URL} target="_blank">{buttonText}</a>
        </div>
    );
}
