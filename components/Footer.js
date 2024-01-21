import React from 'react'

const Footer = ({ bg }) => {
	let tcBg;

	if (typeof(bg) === 'undefined') {
		tcBg = 'collection-desc pb-2 pl-2'
	} else {
		tcBg = 'collection-desc pb-2 pl-2 black-bg'
	}

	return (
		<div>
			<div className={tcBg}>
				<p>vPhree is provided on an "as is" and "as available" basis. The vPhree Team does not give any warranties and will not be liable for any loss, direct or indirect, through continued use of this app.</p>
			</div>
			<div className="footer black-bg drk-grey-txt flex">
				<p>Be phree. Be phunky. Shout out to the <a href="https://notlarvalabs.com" target="_blank">NotLarvaLabs</a> team for paving the way ✊</p>
			</div>
		</div>
	)
}

export default Footer