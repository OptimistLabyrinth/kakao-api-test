import PropTypes from 'prop-types'

function MarginedDiv(props) {
  const { top, right, bottom, left, children } = props

  return (
    <div
      style={{
        margin: `${top ?? '1rem'} ${right ?? '1rem'} ${bottom ?? '1rem'} ${
          left ?? '1rem'
        }`,
      }}
    >
      {children}
    </div>
  )
}

MarginedDiv.propTypes = {
  top: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string,
  left: PropTypes.string,
  children: PropTypes.any,
}

export default MarginedDiv
