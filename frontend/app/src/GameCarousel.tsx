import Carousel from 'react-bootstrap/Carousel';
import { useAppSelector } from './app/hooks';
import { selectGame } from './Reducers/shopSlice';
import "./css/SingleGame.css"

function GameCarousel() {
  const game = useAppSelector(selectGame);

  const thumbnailScreenshots = game?.steam_game?.data.screenshots

  return (
    <Carousel >
      {thumbnailScreenshots.map((screenshot: any) => (
        <Carousel.Item key={screenshot.id} >
          <div>
            <img
              className="carousel"
              src={screenshot.path_full}
              alt="Game screenshot"
            />
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default GameCarousel;