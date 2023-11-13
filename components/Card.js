import React from 'react'
import Image from 'next/image'
import Router from 'next/router'

const Card = ({ price, atts, id }) => {
	let alt_id
	let s_id = id.toString()

	if (s_id.length === 1) {
		alt_id = "000"+s_id
	} else if (s_id.length === 2) {
		alt_id = "00"+s_id
	} else if (s_id.length === 3) {
		alt_id = "0"+s_id
	} else {
		alt_id = s_id
	}
	

	return 	(
		<div 
			key={id}
			className="brite my-2 black-bg white-txt inline-block sans-underline" 
			data-price={price} 
			data-atts={atts}
			onClick={() => {Router.push({pathname: `/phunk/${id}`})}}
		>
			<div className="img-wrapper v3-bg">
				<Image 
					className="w-100" 
					src={`/phunks/phunk${alt_id}.svg`}
					loading="lazy" 
					alt={`phunk ${id}`}
					height="100"
					width="100"
				/>
			</div> 
			<div className="card-info-wrapper ml-2">
				<p className="phunk-id mb-0 v3-txt">#{id}</p>
				<h4 className="phunk-price mb-1">{price}</h4>
			</div>
		</div>
	)
} 

export default Card
