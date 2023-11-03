import {ReactComponent as XaiLogo} from "@/svgs/xai-logo.svg";
import {PiCopy} from "react-icons/pi";
import {AiOutlineCheck, AiOutlineInfoCircle, AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {useState} from "react";
import {useOperator} from "@/features/operator";
import {IoIosArrowDown} from "react-icons/io";
import {useSetAtom} from "jotai/index";
import {drawerStateAtom, DrawerView} from "@/features/drawer/DrawerManager.tsx";
import {FaCircle, FaRegCircle} from "react-icons/fa";

const dummyLicenses = [
	{
		ownerAddress: "0xBAbeCCc528725ab1BFe7EEB6971FD7dbdd65cd85",
		status: "KYC required",
		accruedEsxai: "0.0234",
		openseaUrl: "https://xai.games/",
	},
	{
		ownerAddress: "0xBAbeCCc528725ab1BFe7EEB6971FD7dbdd65cd85",
		status: "KYC required",
		accruedEsxai: "0",
		openseaUrl: "https://xai.games/",
	},
	{
		ownerAddress: "0xBAbeCCc528725ab1BFe7EEB6971FD7dbdd65cd85",
		status: "KYC required",
		accruedEsxai: "0.2398",
		openseaUrl: "https://xai.games/",
	},
	{
		ownerAddress: "0xBAbeCCc528725ab1BFe7EEB6971FD7dbdd65cd85",
		status: "Wallet not assigned",
		accruedEsxai: "0.00239",
		openseaUrl: "https://xai.games/",
	},
	{
		ownerAddress: "0xBAbeCCc528725ab1BFe7EEB6971FD7dbdd65cd85",
		status: "Waiting for challenge",
		accruedEsxai: "0.00123",
		openseaUrl: "https://xai.games/",
	},
	{
		ownerAddress: "0xBAbeCCc528725ab1BFe7EEB6971FD7dbdd65cd85",
		status: "Submitting claim",
		accruedEsxai: "0.00239",
		openseaUrl: "https://xai.games/",
	},
	{
		ownerAddress: "0xBAbeCCc528725ab1BFe7EEB6971FD7dbdd65cd85",
		status: "Checking claim",
		accruedEsxai: "0.00239",
		openseaUrl: "https://xai.games/",
	},
	{
		ownerAddress: "0xBAbeCCc528725ab1BFe7EEB6971FD7dbdd65cd85",
		status: "Claim submitted",
		accruedEsxai: "0.00239",
		openseaUrl: "https://xai.games/",
	},
]

const dropdownBody = [
	"0xBAbeCCc528725ab1BFe7EEB6971FD7dbdd65cd85",
	"Fake data lol",
]

export function HasKeys() {
	const setDrawerState = useSetAtom(drawerStateAtom);
	const {publicKey} = useOperator();
	const [copied, setCopied] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	function getKeys() {
		return dummyLicenses.map((item, i: number) => {
			const isEven = i % 2 === 0;
			let status;

			switch (item.status) {
				case "KYC required":
					status = (
						<p className="flex items-center gap-1">
							<FaCircle size={8} color={"#EAB32B"}/>
							KYC required
							<a onClick={() => alert("KYC")} className="text-[#F30919] ml-1 cursor-pointer">
								Begin KYC
							</a>
						</p>
					);
					break;
				case "Wallet not assigned":
					status = (
						<p className="flex items-center gap-1">
							<FaRegCircle size={8}/>
							Wallet not assigned
							<a onClick={() => alert("Assign")} className="text-[#F30919] ml-1 cursor-pointer">
								Assign
							</a>
						</p>
					);
					break;
				case 'Waiting for challenge':
					status = "Waiting for challenge"
					break;
				case 'Submitting claim':
					status = "Submitting claim"
					break;
				case 'Checking claim':
					status = "Checking claim"
					break;
				case 'Claim submitted':
					status = "Claim submitted"
					break;

				default:
					status = null;
			}

			return (
				<tr className={`${isEven ? "bg-[#FAFAFA]" : "bg-white"} flex px-8 text-sm`} key={`license-${i}`}>
					<td className="w-full max-w-[70px] px-4 py-2">{i + 1}</td>
					<td className="w-full max-w-[360px] px-4 py-2">{item.ownerAddress}</td>
					<td className="w-full max-w-[360px] px-4 py-2 text-[#A3A3A3]">{status}</td>
					<td className="w-full max-w-[150px] px-4 py-2 text-right">{item.accruedEsxai}</td>
					<td
						className="w-full max-w-[150px] px-4 py-2 text-[#F30919] cursor-pointer"
						onClick={() => window.electron.openExternal(item.openseaUrl)}
					>
						View
					</td>
				</tr>
			)
		})
	}

	function copyPublicKey() {
		if (publicKey && navigator.clipboard) {
			navigator.clipboard.writeText(publicKey)
				.then(() => {
					setCopied(true);
					setTimeout(() => {
						setCopied(false);
					}, 2000);
				})
				.catch(err => {
					console.error('Unable to copy to clipboard: ', err);
				});
		} else {
			console.error('Clipboard API not available, unable to copy to clipboard');
		}
	}

	function getDropdownItems() {
		return dropdownBody.map((item, i) => (
			<p className="p-2 cursor-pointer hover:bg-gray-100" key={`key-item-${i}`}>{item}</p>
		))
	}

	return (
		<div className="w-full flex flex-col gap-4">
			<div className="w-full h-auto flex flex-col py-3 pl-10">
				<p className="text-sm uppercase text-[#A3A3A3] mb-1 mt-2">
					View Wallet
				</p>
				<div className="flex flex-row gap-2">
					<div className="w-full max-w-[695px]">
						<div
							onClick={() => setIsOpen(!isOpen)}
							className={`flex items-center justify-between w-full text-[15px] border-r border-l border-t ${!isOpen ? "border-b" : null} border-[#A3A3A3] p-2`}
						>
							<p>
								All wallets (1)
							</p>
							<IoIosArrowDown
								className={`h-[15px] transform ${isOpen ? "rotate-180 transition-transform ease-in-out duration-300" : "transition-transform ease-in-out duration-300"}`}
							/>
						</div>

						{isOpen && (
							<div
								className="absolute flex flex-col w-full max-w-[695px] border-r border-l border-b border-[#A3A3A3] bg-white">
								{getDropdownItems()}
							</div>
						)}
					</div>

					<button
						onClick={() => copyPublicKey()}
						className="flex flex-row justify-center items-center gap-2 text-[15px] border border-[#E5E5E5] px-4 py-2"
					>
						{copied ? (<AiOutlineCheck className="h-[15px]"/>) : (<PiCopy className="h-[15px]"/>)}
						Copy address
					</button>

					<button
						onClick={() => setDrawerState(DrawerView.ViewKeys)}
						className="flex flex-row justify-center items-center gap-2 text-[15px] border border-[#E5E5E5] px-4 py-2"
					>
						<AiOutlinePlus className="h-[15px]"/>
						Add wallet
					</button>

					<button
						onClick={() => alert("Does nothing")}
						className="flex flex-row justify-center items-center gap-2 text-[15px] border border-[#E5E5E5] px-4 py-2"
					>
						<AiOutlineMinus className="h-[15px]"/>
						Remove wallet
					</button>
				</div>
			</div>

			<div className="flex flex-col pl-10">
				<div className="flex items-center gap-1 text-[15px] text-[#525252]">
					<p>Accrued network esXAI</p>
					<AiOutlineInfoCircle size={16} color={"#A3A3A3"}/>
				</div>
				<div className="flex items-center gap-2 font-semibold">
					<XaiLogo/>
					<p className="text-3xl">
						{dummyLicenses[0].accruedEsxai} esXAI
					</p>
				</div>
			</div>

			<div className="w-full">
				<table className="w-full bg-white">
					<thead className="text-[#A3A3A3]">
					<tr className="flex text-left text-[12px] uppercase px-8">
						<th className="w-full max-w-[70px] px-4 py-2">Key Id</th>
						<th className="w-full max-w-[360px] px-4 py-2">Owner Address</th>
						<th className="w-full max-w-[360px] px-4 py-2">Status</th>
						<th className="w-full max-w-[150px] px-4 py-2 text-right">Accrued esXai</th>
						<th className="w-full max-w-[150px] px-4 py-2">Opensea Url</th>
					</tr>
					</thead>
					<tbody>

					{getKeys()}

					<tr className="text-[#A3A3A3] text-sm flex px-8">
						<td className="w-full max-w-[70px] px-4 py-2">-</td>
						<td className="w-full max-w-[360px] px-4 py-2">Empty Key Slot</td>
					</tr>
					</tbody>
				</table>
			</div>
		</div>
	)
}
