function About() {

    return(

        <section className="about">
            <h2 className="about__title">
                О проекте
            </h2>
            <div className="about__container">
                <div className="about__textcontainer">
                    <h3 className="about__subtitle">Дипломный проект включал 5 этапов</h3>
                    <p className="about__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about__textcontainer">
                    <h3 className="about__subtitle">На выполнение диплома ушло 5 недель</h3>
                    <p className="about__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="about__line">
                <div className="about__small-block">
                    <div className="about__green-block"><p className="about__line-text">1 неделя</p></div>
                    <p className="about__name">Back-end</p>
                </div>
                <div className="about__big-block">
                    <div className="about__black-block"><p className="about__line-text">4 недели</p></div>
                    <p className="about__name">Front-end</p>
                </div>
            </div>
        </section>

    )
}
export default About;
