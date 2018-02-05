insertDivs();
insertMugshots();

//Replace all p tags with div class=dialogue tags
function insertDivs()
{
	document.body.innerHTML = document.body.innerHTML.replace("<p>EpStart</p>", "<div id='ep'>");
	document.body.innerHTML = document.body.innerHTML.replace("<p>EpFin</p>", "</div>");

	var pTags=document.getElementById('ep').getElementsByTagName('p');

	for(i=0;i<pTags.length;i++)
	{
	    var line = pTags[i];  
	    var p = document.createElement('p');
	    var div = document.createElement('div');

	    if (line.innerHTML.startsWith("@"))
	    {
	    	div.className = "location";
	    	line.innerHTML = line.innerHTML.substr(1);
	    }
	    else if (line.innerHTML.startsWith("%"))
	    {
	    	div.className = "description";
	    	line.innerHTML = line.innerHTML.substr(1);
	    }
	    else
	    {
			div.className = "dialogue";
	    }

	    //Surround inner HTML with p tags
	    p.innerHTML = line.innerHTML;
	    div.innerHTML = p.outerHTML;

	    line.parentNode.replaceChild(div, line);
	}
}

function insertMugshots()
{
	var directory = "./assets/images/mugshots/";
	//Instances of where a character has an image attached to their name. Along with bolding the name.

	//TODO: Import character names and emotes from separate text files
	var names = {
		//Seven Mercenaries Members
		enker:"Enker",
		quint:"Quint",
		punk:"Punk",
		ballade:"Ballade",
		//Supporting Characters
		crewjoe:"CrewJoe",
		//Villians
		wily:"Wily",
		sniperjoe:"SniperJoe",
		riff:"Riff",
		warpman:"WarpMan",
		lento:"Lento",
		//Generic NPCs
		//Test Character
		magma:"Magma",
		//Temporary
		enker:"Naoshi",
		quint:"Hunter",
		punk:"Shinobu",
		ballade:"Kayorei",
		busterrod:"Iga",
		megawater:"Falling Star",
		hyperstorm:"Stardust"
	};

	var emotes = {
		original:"",
		happy:"Happy",
		annoyed:"Annoyed",
		angry:"Angry",
		shocked:"Shocked",
		sad:"Sad",
		damaged:"Damaged",
		relieved:"Relieved",
		pissed:"Pissed",
		glare:"Glare",
		aloof:"Aloof",
		giddy:"Giddy",
		scared:"Scared",
		nani:"Nani",
		snicker:"Snicker",
		owo:"OwO",
		sleep:"Sleep",
		lenny:"Lenny",
		hotdog:"Hotdog",
		scary:"Scary",
		punched:"Punched",
		thinking:"Thinking",
		gameboy:"GB",
		glad:"Glad"
	};

	//TODO: make it work with brackets and spaces between the name and emote
	//Look at all name/emote combinations
	for (var nameKey in names)
	{
		for (var emoteKey in emotes)
		{
			var str = "<p>" + names[nameKey] + emotes[emoteKey] + ":";
			var suffix = "";

			//Insert name suffix and prefix
			var prefix = names[nameKey];

			switch(nameKey)
			{
			//Cyborg Resistance Members
				case "hornet":
				case "magma":
				case "splash":
				case "galaxy":
				case "plug":
				case "tornado":
					suffix = " Man";
					break;
				case "jewel":
					suffix = " Woman";
					break;
				case "concrete":
					prefix = "Con";
					suffix = "critter";
					break;
				case "fake":
					suffix = "tte";
					break;
				case "spike":
					prefix = "Concrete";
					suffix = " Man";
					break;
			//Villains
			case "wily":
					prefix = "Dr. ";
					suffix = "Wily";
					break;
			case "sniperjoe":
					prefix = "Sniper ";
					suffix = "Joe";
					break;
			//Supporting Characters
				case "drlight":
					prefix = "Dr. ";
					suffix = "Light";
					break;
				case "crewjoe":
					prefix = "Crew ";
					suffix = "Joe";
					break;
			}

			var find = new RegExp(str, "gi");
			var imagePath = directory + nameKey + emoteKey + ".png"; 

			replace = "<test><img id=double src=" + imagePath + "> <p><b>" + prefix + suffix + ":</b></br></test>";
			
			//TODO: check and see if replace path exists, if not, bold name and continue, else...
			document.body.innerHTML = document.body.innerHTML.replace(find, replace);	
		}
	}

	//Format
	document.body.style.backgroundColor = "#101010";
	document.body.style.color = "#C0C0C0";
	document.body.style.fontSize = "medium";
}
