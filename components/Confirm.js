import { useCallback, useContext } from 'react';
import RideSelector from './RideSelector';
import { UberContext } from '../context/uberContext';

const style = {
  wrapper: `flex-1 h-full flex flex-col justify-between`,
  rideSelectorContainer: `h-full flex flex-col overflow-scroll`,
  confirmButtonContainer: ` border-t-2 cursor-pointer z-10`,
  confirmButton: `bg-black text-white m-4 py-4 text-center text-xl`,
}

export default function Confirm() {
	const { 
		pickup, 
		dropoff, 
		currentAccount, 
		price, 
		selectedRide, 
		pickupCoordinates, 
		dropoffCoordinates,
		metamask,
	} = useContext(UberContext);

	const storeTripDetails = useCallback(async (pickup, dropoff) => {
		try {
			await fetch('/api/db/saveTrips', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					pickupLocation: pickup,
					dropoffLocation: dropoff,
					userWalletAddress: currentAccount,
					price, 
					selectedRide,
				}),
			});
			await metamask.request({
				method: 'eth_sendTransaction',
				params: [
					{
						from: currentAccount,
						to: process.env.NEXT_PUBLIC_UBER_ADDRESS,
					}
				]
			})
		} catch(error) {
			console.error('STORE TRIP DETAILS', { error });
		}
	}, [currentAccount, metamask, price, selectedRide]);

	return (
		<div className={style.wrapper}>
			<div className={style.rideSelectorContainer}>
				{pickupCoordinates && dropoffCoordinates && <RideSelector />}
			</div>
			<div className={style.confirmButtonContainer}>
				<div className={style.confirmButtonContainer}>
					<div className={style.confirmButton}
						onClick={() => storeTripDetails(pickup, dropoff)}>
						Confirm {selectedRide.service}
					</div>
				</div>
			</div>
		</div>
	);
}
