class Episode 
{
    constructor(episodeName, duration, season) 
    {
        this.episodeName = episodeName;
        this.duration = duration;
        this.season = season;
    }
  
    // You can add methods specific to AnimeEpisode here
    // For example:
    play() 
    {
      console.log(`Now playing: ${this.episodeName}`);
    }

}

 