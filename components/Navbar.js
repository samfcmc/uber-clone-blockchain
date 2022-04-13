import { useContext } from 'react';
import Image from 'next/image';
import { BsPerson } from 'react-icons/bs';

import avatar from '../temp/avatar.png';
import { UberContext } from '../context/uberContext';

const style = {
	wrapper: 	'h-16 w-full bg-black text-white flex md:justify-around items-center px-60',
	leftMenu: 'flex gap-3',
	logo: 'text-3x1 text-white flex cursor-pointer mr-16',
	menuItem: 'text-lg text-white font-medium flex items-center mx-4 cursor-pointer',
	rightMenu: 'flex gap-3 items-center',
	userImageContainer: 'mr-2',
	userImage: 'h-10 w-10 mr-4 rounded-full p-px object-cover cursor-pointer',
	loginButton: 'flex items-center cursor-pointer rounded-full hover:bg-[#333333] px-4 py-1',
}

export default function Navbar() {
	const { currentAccount, connectWallet, currentUser = {} } = useContext(UberContext);

	return (
		<div className={style.wrapper}>
			<div className={style.leftMenu}>
				<div className={style.logo}>Uber</div>
				<div className={style.menuItem}>Ride</div>
				<div className={style.menuItem}>Drive</div>
				<div className={style.menuItem}>More</div>
			</div>
			<div className={style.rightMenu}>
				<div className={style.menuItem}>Help</div>
				<div className={style.menuItem}>
					{currentUser.name?.split(' ')[0]}
				</div>
				<div className={style.userImageContainer}>
					<Image className={style.userImage} src={avatar} width={40} height={40} alt="avatar" />
				</div>
				{
					currentAccount
					? (<div>{currentAccount.slice(0,6)}...{currentAccount.slice(39)}</div>)
					: (
					<div className={style.loginButton} onClick={connectWallet}>
						<BsPerson />
						<span>Please log in</span>
					</div>)
				}
			</div>
		</div>
	)
}