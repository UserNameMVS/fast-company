import React from 'react'
import Progress from './progress'

import PropTypes from 'prop-types'

const ProgressList = ({ skills, type }) => {
  const skillsConfig = {
    html: {
      name: 'HTML',
      color: 'bg-danger',
      image:
        'https://png2.cleanpng.com/sh/b906c08cad0a4ccab928e67d680f0144/L0KzQYm3VMI3N519j5H0aYP2gLBuTgdmal5pfehubHBzfbb1lL1pfJ5xReRuc4DyfsTwlvUuf5ZnRdZuc3nqfn7qggNkaZVuRadqZUG8dYfpV8Y1QZU6RqM7M0mzQ4q7UcUzPGg4TacENUS7RIa1kP5o/kisspng-web-development-html-responsive-web-design-cascadi-5ae19e6b7649d5.1239039415247355954845.png'
    },
    css: {
      name: 'CSS',
      color: 'bg-primary'
    },
    js: {
      name: 'JavaScript',
      color: 'bg-warning'
    },
    react: {
      name: 'React',
      color: 'bg-info',
      image: ''
    }
  }

  const persons = [
    {
      id: 1,
      name: 'Владислав Муравьев',
      skills: [
        { _id: 1, value: skillsConfig.html, level: 90 },
        { _id: 2, value: skillsConfig.css, level: 80 },
        { _id: 3, value: skillsConfig.js, level: 70 },
        { _id: 4, value: skillsConfig.react, level: 60 }
      ]
    }
  ]

  return (
    <div>
      {persons[0].skills.map((skill) => (
        <Progress key={skill._id} {...skill.value} percent={skill.level} />
      ))}
      {/* <div>
        <img
          style={{
            width: '50px',
            height: '50px',
            objectFit: 'contain'
          }}
          src={skillsConfig.html.image}
          alt=""
        />
      </div> */}
    </div>
  )
}

ProgressList.defaultProps = {
  type: 'line'
}

ProgressList.propTypes = {
  skills: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired
}

export default ProgressList
