formatMarkdown();

// Replace markdown with formatted HTML
function formatMarkdown()
{
	// A dictionary of tags and class names
	// Add to this dictionary to add new markdown tags
	var tags = {
		"@LOCATION": "location",
		"@EPNUM:": "epnum",
		"@TITLE:": "eptitle",
		"@AUTHOR:": "author",
		"@ACTNUM:": "actnum",
		"%%": "description",
		"%": "description",
	};

	var locationDirectory = "../../../7mercs/assets/images/locations/";
	var mugshotDirectory = "../../../7mercs/assets/images/mugshots/";
	var json = getJsonData();
	var characters = json.names;
	var emotes = json.emotes;

	document.body.innerHTML = document.body.innerHTML.replace("<p>EpStart</p>", "<div id='ep'>");
	document.body.innerHTML = document.body.innerHTML.replace("<p>EpFin</p>", "</div>");

	var paragraphs = document.getElementById('ep').getElementsByTagName('p'); // Get all paragraph tags in the ep
	var line;
	var comment = false;

	for(var i = 0; i < paragraphs.length; i++)
	{
		var p = document.createElement('p');
		var div = document.createElement('div');
		line = paragraphs[i].innerHTML;

		// single line parsing
		// multi line parsing

		// if any token matches

		var state = setParsingState(line);

		function setParsingState(line)
		{
			for (var token in tags)
			{
				if (line.startsWith(token))
				{
					if (tags[token] === "location")
					{
						return "location";
					}
					else if (tags[token])
					{

					}
				}
			}
			
			return "multi";
			return "single";
		}
		
		// Add classes to divs
		for (var token in tags)
		{
			if (line.startsWith(token))
			{
				div.className = tags[token];
				line = line.substr(token.length, line.length); // Remove the markdown

				// Set background image for locations
				if (tags[token] === "location")
				{
					var location = line.substring(0, line.lastIndexOf(':'));
					if (location) 
					{
						div.style.backgroundImage = "url('" + locationDirectory + location + ".png')";
					}
					line = line.substr(line.indexOf(":") + 1, line.length);
				}
				else if (token === "%%")
				{
					comment = true;
				}

				break;
			}
		}

		if (comment === true)
		{
			continue;
		}

		// Dialogue styling
	    if (!div.className)
	    {
			div.className = "dialogue";
			var speaker = line.substr(0, line.indexOf(':')).toLowerCase();
			var name = speaker;
			var emote = "neutral"

			if (speaker.indexOf(' ') > -1)
			{
				name = speaker.substr(0, speaker.indexOf(' '));
				emote = speaker.substr(speaker.indexOf(' ')+1, speaker.length);
			}

			var emoteIndex = emotes.indexOf(emote);
			var displayname = line.substr(0, line.indexOf(':')).toLowerCase();
			var imagePath = "";

			if (name in characters)
			{
				displayname = characters[name].displayName;

				if (characters[name].imagePathPrefix)
					imagePath = "<img id=double src=" + mugshotDirectory + characters[name].imagePathPrefix + emotes[emoteIndex] + ".png>"; 
			}

			var replace =  imagePath + " <p><profilename>" + displayname + "</profilename></br>";
			find = new RegExp(speaker + ":", "gi");
			line = line.replace(find, replace);	
			div.innerHTML = line;
		}
		else 
		{
			p.innerHTML = line;
			div.innerHTML = p.outerHTML;
		}
	    	
	    paragraphs[i].parentNode.replaceChild(div, paragraphs[i]);
	}
}

// Showdown markdown functionality

showdown.setOption("strikethrough", "true");
showdown.setOption("tables", "true");

var text = document.getElementById("act1").innerHTML,
    target = document.getElementById("targetDiv"),
    converter = new showdown.Converter(),
    html = converter.makeHtml(text);

    target.innerHTML = html;

// Page turner function. Are we keeping this?

function pageTurn(sourceDiv)
{
    text = document.getElementById(sourceDiv).innerHTML;
    target = document.getElementById("targetDiv");
    converter = new showdown.Converter();
    html = converter.makeHtml(text);

    target.innerHTML = html;
}

function getJsonData() {
	return ({
		"names": {
//Seven Mercenaries
	//Armor Form
			"naoshi": {
				"displayName": "Enker",
				"imagePathPrefix": "7mercs/enker"
			},
			
			"hunter": {
			"displayName": "Quint",
			"imagePathPrefix": "7mercs/quint"
			},
			
			"kayorei": {
				"displayName": "Ballade",
				"imagePathPrefix": "7mercs/ballade"
			},
			
			"shinobu": {
			"displayName": "Punk",
			"imagePathPrefix": "7mercs/punk"
			},

			"iga": {
				"displayName": "Buster Rod G.",
				"imagePathPrefix": "7mercs/busterrod"
			},
			
			"fallingstar": {
			"displayName": "Mega Water S.",
			"imagePathPrefix": "7mercs/megawater"
			},
			
			"stardust": {
			"displayName": "Hyper Storm H.",
			"imagePathPrefix": "7mercs/hyperstorm"
			},	
	//Human Form
			"humannaoshi": {
				"displayName": "Naoshi",
				"imagePathPrefix": "7mercs/humanform/naoshi"
			},
			
			"humanhunter": {
				"displayName": "Hunter",
				"imagePathPrefix": "7mercs/humanform/hunter"
			},
			"humanshinobu": {
				"displayName": "Shinobu",
				"imagePathPrefix": "7mercs/humanform/shinobu"
			},
			"humankayorei": {
				"displayName": "Kayorei",
				"imagePathPrefix": "7mercs/humanform/kayorei"
			},
			"humanfallingstar": {
				"displayName": "Falling Star",
				"imagePathPrefix": "7mercs/humanform/fallingstar"
			},
			
			
			"1ga": {
				"displayName": "1-GA",
				"imagePathPrefix": "7mercs/humanform/iga"
			},

//Fatal Five
			"warpman": {
				"displayName": "Warp Man",
				"imagePathPrefix": "fatalfive/warpman"
			},
			"riff": {
				"displayName": "Riff",
				"imagePathPrefix": "fatalfive/riff"
			},
			"lento": {
				"displayName": "Lento",
				"imagePathPrefix": "fatalfive/lento"
			},
			"karasu": {
				"displayName": "Karasû",
				"imagePathPrefix": "fatalfive/karasu"
			},
			"staccato": {
				"displayName": "Staccato",
				"imagePathPrefix": "fatalfive/staccato"
			},
			"bigarm": {
				"displayName": "Big Arm",
				"imagePathPrefix": "fatalfive/bigarm"
			},
			"sniper": {
				"displayName": "Sniper",
				"imagePathPrefix": "fatalfive/sniper"
			},
			"armored": {
				"displayName": "Armored",
				"imagePathPrefix": "fatalfive/armored"
			},
			"raven": {
				"displayName": "Raven",
				"imagePathPrefix": "fatalfive/raven"
			},
			"knight": {
				"displayName": "Knight",
				"imagePathPrefix": "fatalfive/knight"
			},				

//Mega Man Characters
	//Team Light
			"light": {
				"displayName": "Dr. Light",
				"imagePathPrefix": "lightlabs/light"
			},
			"megaman": {
				"displayName": "Mega Man",
				"imagePathPrefix": "lightlabs/megaman"
			},
			"protoman": {
				"displayName": "Proto Man",
				"imagePathPrefix": "lightlabs/protoman"
			},
	//Team Wily
			"wily": {
				"displayName": "Dr. Wily",
				"imagePathPrefix": "wilylabs/wily"
			},
			"bass": {
				"displayName": "Bass",
				"imagePathPrefix": "wilylabs/bass"
			},
			"treble": {
				"displayName": "Treble",
				"imagePathPrefix": "wilylabs/treble"
			},
//Sniper Joes
			"crewjoe": {
				"displayName": "Crew Joe",
				"imagePathPrefix": "genericbots/crewjoe"
			},
			"sniperjoe": {
				"displayName": "Sniper Joe",
				"imagePathPrefix": "genericbots/sniperjoe"
			},	
			
//Misc
			"unknown": {
				"displayName": "???",
				"imagePathPrefix": "unknown/anonymous"
			}
			
			
		},
//Emotes
		"emotes": [
			"neutral",
			"happy",
			"annoyed",
			"angry",
			"shocked",
			"sad",
			"damaged",
			"relieved",
			"hurt",
			"glad"
		]
	});
}
