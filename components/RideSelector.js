import uberX from '../assets/rides/uberX.png';
import uberBlack from '../assets/rides/uberBlack.png';
import uberBlackSuv from '../assets/rides/uberBlackSuv.png';
import uberSelect from '../assets/rides/uberSelect.png';
import uberXL from '../assets/rides/uberXL.png';
import ethLogo from '../assets/eth-logo.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const style = {
  wrapper: `h-full flex flex-col`,
  title: `text-gray-500 text-center text-xs py-2 border-b`,
  carList: `flex flex-col flex-1 overflow-scroll`,
  car: `flex p-3 m-2 items-center border-2 border-white`,
  selectedCar: `border-2 border-black flex p-3 m-2 items-center`,
  carImage: `h-14`,
  carDetails: `ml-2 flex-1`,
  service: `font-medium`,
  time: `text-xs text-blue-500`,
  priceContainer: `flex items-center`,
  price: `mr-[-0.8rem]`,
}

const basePrice = 154;

export default function RideSelector() {
	const [carList, setCarList] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const response = fetch('/api/db/getRideTypes');
				const data = await (await response).json();
				setCarList(data.data);
			} catch(error) {
				console.error(error);
			}
		})();
	}, []);
	return (
		<div className={style.wrapper}>
			<div className={style.title}>
				Choose a ride, or swipe up for more
			</div>
			<div className={style.carList}>
				{carList.map((car, index) => (
					<div className={style.car} key={index}>
						<Image
							className={style.carImage}
							src={car.iconUrl} 
							alt={car.service}
							height={50}
							width={50}
						/>
						<div className={style.carDetails}>
							<div className={style.service}>
								{car.service}
							</div>
							<div className={style.time}>
								5 min away
							</div>
						</div>
						<div className={style.priceContainer}>
							<div className={style.price}>
								{((basePrice / 10 ** 5) * car.priceMultiplier).toFixed(5)}
							</div>
							<Image 
									src={ethLogo} 
									alt='Price in eth' 
									height={25}
									width={40} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
