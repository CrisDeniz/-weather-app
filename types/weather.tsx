export type weather = {
    name: string;
    main: {
      temp: number;
      temp_max:number;
      temp_min:number;
      humidity:number;
    }
    weather: [
      { 
        description: string;
        icon: string;
      }
    ]
  };
   
