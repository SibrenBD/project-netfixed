console.log(sheep);

  // Creating an instance of AnimeEpisode
  const firstEpisode = new Episode("The Adventure Begins", 24, "Spring 2024");
  
  // Accessing properties
  console.log(`Episode Name: ${firstEpisode.episodeName}`);
  console.log(`Duration: ${firstEpisode.duration} minutes`);
  console.log(`Season: ${firstEpisode.season}`);
  
  // Calling a method
  firstEpisode.play();

  let episodesVash = [];
  episodesVash.push(new Episode('episode1', 30, 'Season1'));
  episodesVash.push(new Episode('episode2', 30, 'Season1'));
  episodesVash.push(new Episode('episode3', 30, 'Season1'));
  episodesVash.push(new Episode('episode4', 30, 'Season1'));

  const season1Vash = new Season(episodesVash);