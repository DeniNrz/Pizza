import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton: React.FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="285" rx="10" ry="10" width="275" height="23" />
    <rect x="128" y="424" rx="15" ry="15" width="152" height="30" />
    <rect x="0" y="323" rx="10" ry="10" width="275" height="88" />
    <rect x="0" y="426" rx="10" ry="10" width="95" height="30" />
    <circle cx="138" cy="138" r="125" />
  </ContentLoader>
)

export default Skeleton
