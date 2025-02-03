import { useRouter } from "next/navigation";
import { MENU } from "./menu.data";
import s from "./menu.module.scss";

const Menu: React.FC = () => {
	const { push } = useRouter();

	return (
		<ul className={s.menu}>
			{MENU.map((menuItem, index) => {
				return (
					<li
						key={index}
						onClick={() => {
							push(menuItem.link);
						}}
					>
						<menuItem.icon />
						<p>{menuItem.name}</p>
					</li>
				);
			})}
		</ul>
	);
};

export default Menu;
