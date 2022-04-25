import PropTypes from 'prop-types'

function PaddedButton(props) {
  const { top, right, bottom, left, onClick, children } = props

  return (
    <button
      style={{
        padding: `${top ?? '1rem'} ${right ?? '5ch'} ${bottom ?? '1rem'} ${
          left ?? '5ch'
        }`,
      }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

PaddedButton.propTypes = {
  top: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string,
  left: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
}

export default PaddedButton
