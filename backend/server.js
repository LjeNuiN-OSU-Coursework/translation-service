const axios = require("axios");
const express = require("express");

// initialize express server
const app = express();
app.use(express.json());

const PORT = 4500;		// default port is set to 4500 but you can change this
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)
);

// IMPORTANT: put your google geocode api key here otherwise the requests will not work


// given some text responds witht he text translated
// simply send a POST request with text to translate in the body.
app.post("/translate", async (req, res) => {
	try {
		const translate = req.body.translate;

		// send request to libre translate api
		const { data } = await axios.get(
			`"https://libretranslate.de/translate"`
		);

		// if the response status is OK return the translated text
		if (data.status === 'OK') {
			translatedOutput = data.translatedText;
			return res.status(200).json({ translatedOutput });
		} else {
			return res.status(400).json({ message: "there was a problem when trying to translate your text" })
		}
	} catch (error) {
		console.error(error);
		return res.status(400).json({ message: "error" })
	}
});