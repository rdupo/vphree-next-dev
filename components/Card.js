import React from 'react'
import Image from 'next/image'

const Card = ({ price, atts, id }) => {
	return 	(
		<a className="brite my-2 black-bg white-txt inline-block sans-underline" 
			 data-price={price} 
			 data-atts={atts}
			 id={id}
			 href={`/phunk/${id}`}>
			<div className="img-wrapper v3-bg">
				<img 
					className="w-100" 
					src={`https://ipfs.io/ipfs/QmaYDjSxjefTzG5BFPF12FM6CK4AjaxBh3WDTnx58CGusE/${id}.png`}
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
		</a>
	)
} 

export default Card
