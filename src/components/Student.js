import image from '../images/avatar.jpg'
import vector from '../images/text__COLOR_font-main.svg'
function Student() {

    return(

        <section className="student">
            <h2 className="student__title">
                Студент
            </h2>
            <div className="student__info-container">
                <div className="student__text-container">
                    <h3 className="student__name">
                        Илья
                    </h3>
                    <p className="student__stag">Студент, 27 лет</p>
                    <p className="student__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <p className="student__link-container">
                        <a href="#" className="student__link">Facebook</a>
                        <a href="#" className="student__link">GitHub</a>
                    </p>
                </div>
                <img className="student__image" src={image}/>
            </div>
            <div className="student__site-container">
                <h4 className="student__site-portfolio">Портфолио</h4>
                <div className="student__site-content">
                    <p className="student__site-name">Статичный сайт</p>
                    <a href="https://github.com/Ilyakrasovsk/how-to-learn/" target="_blank">
                      <img src={vector} className="student__site-link"></img>
                    </a>
                </div>
                <div className="student__site-content">
                    <p className="student__site-name">Адаптивный сайт</p>
                    <a href="https://github.com/Ilyakrasovsk/russian-travell-progect/" target="_blank">
                      <img src={vector} className="student__site-link"></img>
                    </a>
                </div>
                <div className="student__site-content">
                    <p className="student__site-name">Одностраничное приложение</p>
                    <a href="https://github.com/Ilyakrasovsk/mestoik" target="_blank">
                      <img src={vector} className="student__site-link"></img>
                    </a>
                </div>
            </div>
        </section>

    )
}
export default Student;
