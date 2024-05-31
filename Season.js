class Season 
{
    constructor(episodes) 
    {
       this.episodes = episodes;
    }
  
    // You can add methods specific to AnimeEpisode here
    // For example:
    PrintEpisodes(episodes) 
    {
      for(let episode=0; episode < episodes.length; episode++)
      {
        console.log(episodes[episode]);
      }
    }
}

 