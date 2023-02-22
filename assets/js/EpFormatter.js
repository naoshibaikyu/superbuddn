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
			"kurasu": {
				"displayName": "Kurasu",
				"imagePathPrefix": "fatalfive/kurasu"
			},
			"staccato": {
				"displayName": "Staccato",
				"imagePathPrefix": "fatalfive/staccato"
			},			

//Mega Man Characters
			"wily": {
				"displayName": "Dr. Wily",
				"imagePathPrefix": "wilylabs/wily"
			},
//Sniper Joes
			"crewjoe": {
				"displayName": "Crew Joe",
				"imagePathPrefix": "genericbots/crewjoe"
			},
			"sniperjoe": {
				"displayName": "Sniper Joe",
				"imagePathPrefix": "genericbots/sniperjoe"
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
			"relieved"
		]
	});
}
