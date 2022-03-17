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
                    <p className="student__text">Я родился и живу в ХМАО, закончил колледж по специальности "Строительство автомобильных дорог и аэродромов". У меня есть жена
                        и дочь. Я люблю слушать музыку, а ещё видеоиграми. Недавно начал кодить. С 2021 года начал работать в небольшой IT компании «Югорские интернет решения».</p>
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
                    <img src={vector} className="student__site-link"></img>
                </div>
                <div className="student__site-content">
                    <p className="student__site-name">Адаптивный сайт</p>
                    <img src={vector} className="student__site-link"></img>
                </div>
                <div className="student__site-content">
                    <p className="student__site-name">Одностраничное приложение</p>
                    <img src={vector} className="student__site-link"></img>
                </div>
            </div>
        </section>

    )
}
export default Student;
