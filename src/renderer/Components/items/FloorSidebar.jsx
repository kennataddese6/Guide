import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaUsers } from 'react-icons/fa';
import { FiChevronDown, FiSettings, FiMessageSquare } from 'react-icons/fi';
import { IoMdAnalytics, IoIosNotifications } from 'react-icons/io';
import { BiTask } from 'react-icons/bi';
import { MdAssignment } from 'react-icons/md';
import { logout } from 'renderer/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
const FloorSideBar = ({ index }) => {
  const SideBarIndex = index;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const toLogin = () => {
    dispatch(logout());
  };
  return (
    <div className="dashboard">
      <div className="div">
        <div className="navigation-example">
          <div className="overlap">
            <div className="navigation-elements">
              <div className="divider" />
            </div>
            <div className="navigation-elements-2">
              {' '}
              <img
                className="avatar-man"
                alt="Avatar man"
                src="
                data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIkAsQMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAFBgQHAAECAwj/xABKEAACAQMCBAIFBwcKBAcBAAABAgMABBEFIQYSMUETURQiYXGRByMyQnOBoRUzNVKxwdEmNlNicnSSwuHxNIKy8CQlQ2Ois9IW/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECBAMF/8QAIhEBAQACAwACAwEBAQAAAAAAAAECEQMhMRJBIjJhURME/9oADAMBAAIRAxEAPwCxQBXQFLT8TWWnLBBcMTI6ij9ldw3cYaJgcjOM0tw3uBXQrB1rrFMaYK2BWYroUG0BXYrAKianqEOnW7SynYDNBJm1c+JHzY51z76qHiH5SrszPFYoAoJAbmP/AH+ylWfjHW7gFWvmRT2QAfj1pFt9F42rhnCnc1SXCfygahpl3GmoXU1xaMQr+IxcoPMZojr3ynSrcPFpioI1YgSMCeb+FGzW4JFbbO9dYql9O+Ue6aQC9AIJ+lG7DH3Z3qxND4jgvYlkSRpI2Gzcpx/pRsGQ1qsR1kQOhyD3rKYaNarZrKDcYrmXAikzsApofxHqTaTp0l0iGQoM4FKcXygwanpl0sCGO5SInD9OlK0bGuBBnSJWH1riQ/8AyNZ8oEfPwren9VQ3wNKWgcYromhpHcLzs75UL13p2v3Gs8KXRMZXxrdvVPXpS+h9qf8ASl/WFZQ7B/VFZXNexjUZfypqNtyKVDgAN5VanDOiR6fBHIjl2KjcmqzhtL21j9PitwYYDkB/Ktx8eapEwWJlVAc8vXbyp4/1z3IuUzxiVY8jmbpvXsPuqif/AOl1Z9Q9ME7hhkqudt6auBOKtT1K+dL6N5IunP2BzVzIbWaK6Ara+suRWpGWNCzHAAySe1UHle3cFjayXNzKsUUYyzt0FUnxrxfNrly8NtzxWK9EP0nPm38Kn/KLxV+Vpzp9ox8GOTl2OxI7n25+A9+yKww4HY9/OkHh4bzS8ibtmmnR+DfHVZLmQ4PZTQDSWxqCscfS3FWrpcsPgrlwu1cebKy6jTwYY2bobBwRphi5TGSx75ORQXWuAJolaawk5wN+U9af0lAX1TWrrVbOyj5rydEB864zPLfrRlx42dxRM0UttKY5o2R1OCGFGuF9dn0m9Ro2JjYjnTOxph4qm0HXEdrSRku03VzCyhvYTikTlKOQ2xFasMvlGLkw+FfSGjXaSQxywEtDIAwPsNGgeYZHeq1+S3VWubNrGQktCC0Z/qnG3x/bVjw7ptVRzdGtHpXRrVMEvic6xZW88w8K6t8EtG4wR7qqu1SK4nmbkMMQBB5e1fQV3bR3MLxyAFWGDmqx4yg0vQdIltbcRm5uZDyY6qKjKDXYHpltp8Hg3mosGSMZVM9ae7HUdV1O1aWzt0j08xkIG+m1J1rwjdajptreKOZWUHAPailrpXE9vdmO1u2WyTZVBxtSx8F6pX9BuP6F/wDAKymH8m6t/SH4VlP4jdO2qDS20GSYOnopTcqe2Kpe5gS41N10qNmQbgY7Uz8KWEv5Uk0S+leSxb1uTOxNOkfC2n6Np99LaxhWKkhm7bdqPS9VdFAWtnkXcgZIqXY6lc30cOj2JFqCQeboc++iPBVpatoV/qmpuGjRjkDrQC68N7p7yyQxIX5Y1B3yeg99RJo9bq2dJv14c0ZW13UYywOAxO7HyA6k0h8Wce3muc1np8bWtpzesWPrv7z9X3UKjtdT1O9S29ee8kXALP8Am177/VGOuPOoHE8Fvp10thauXEa/OSA/Sbb4Cr9PqIPPHETg87H4CvBTzTlj1xmvLm5R6vU13DnnOeuKcF7e9hEjz4lcovdvKmq00TS5FVrTUyk22Fc4ye1LmnWM17IUhxv5nFOtnwnJbQoTaWBA6sYg7fE1x5bNtX/nxuknS7y7XVVsrnAbAA8j7RXnxLb21tdek3MZdh026+yvSHwoL1PGIPg+r4h6J7KY5bfT9VtlRmRyd8ZwTXBqLGkcS3Po5jGiSm2A9Yqg6d9s5/Ckzi6zht9TS6tP+FuxzoMfRPcf9+dWbpumaNBduImKzoeVkdz6tb4y4Zj1jRZFtEVbqL5yLGNyO33iuuGWsnHl4946J3yXXXg8RQRk4EhMeM9iCf3CrwiGE3GNzXz1wLMU4k09txiZTv7/APcV9D422rTGGtGua2a1mmQXq1vdXsiW8MphiO8jL1PsHlSBx9wnJBZNewHmjh9d8ncAVaXffrS9x+3LwlqPTeIilQ9OCgBwxYe2MUaCrvsBQbg3+bNh9mKM5onhxB8Ifq/hWqk8ntrKYRY9JtY7sXKRgOO9Qte1zTbeGazv38NnQheYY5qNr7aUflAtrCTT3a6dRIo+bHcGpvhRWEMl1Bp0ltA2LeV8kfftRHTbSG1nie+JKIqufYWJyfguPvqLCoDJbcjl3bK7da972K5iuGS+5wrRBV28j/A1y32ua2IW3EFpZW2o3dooS9u2flHQRIWOPguNu5PlSJeXT3E5kkYtgcoz2AqXrZjN1KYSREzkoueg2oZuSAoyTXWRFrBnnzXsrevkdxXljlyCdxWRmmIZuGrlYJhtTxqWqTR6cBaj5yTZTj6PmarG1mMEik/RO+fKnOfU1XhmWRguEK+sd9iay8ku3ocOUuADNbahcuIo5nEWTuO/vpg0/RIjbxxahetyLv8ANT8mD7wd6Bad4uqh3mvFsrVCMknGQTjIpn09OCbW3Vbq/e7lZMMsfPIQ3uUftpWVWNx9EdU021mtRdW0p9IgXaZH5iwA6N51P0m+klsoXZgSyg5HelvVrdFMFzwc8jCQ+FNaSqy7HPrYboOlHeFoSmlJHMMSRnlYe6ps0uWUhALacbTeGAqC+B2HmQT+2r/B9XPnXz1rcpg4rvnAyUuFbH/KtX5pd3FeaZbXaMDHLGrg+wjNasK87kj3NaxSvxbxhBoLwqoErOcMoNeXC3Fo127lUReFFGOpPer25mw0qfKXJ4fCd0B9cqvxNNQYN0IP30nfKm/Lw1j9aZRRTFODD/Jmw+yFGs0F4M34YsPshRg0But1zWUDbFI70vcW2cDWW6Ay3EqICeu5o8poLr2ZtV0q3+r4pkb3AH/SihBvdEgfifS1gRVEETO5HfoAKjcd6Zd3F3DcwNEscWMJjJc+wd/dRW49GuNZvpDOYUgtgDKkpTk69SMfjVZ6xxNdAyCxkduWQqb9JHORn6vMdqn+Ht6/KAtncz2y+HDbX6RnxgpACjAPzn9Y9gOg99I2fDBK43GMipzT+MzMQig+szM3Mze0k5J+OPZQ+eUSNlelOf4n+uT1rqMdRXnvW1cjpTGxOzdXBRwCKY9DiBilihuuRZBhonQMjfcen3Uo27hdx1ona3bROrjsa48mN+mrhzn2Ni3SC65WtoThugj2pl06e42W2tlVR5JigVjq9vKgWcDmHRu9H7XWrcIPWJI8q4XbZj50ZLZJnRXlABHkK4mVLbJGF5ySagpxPaQQc0zoMdj1NJvFHGRmikW1OHk9VP6o7miT5XURll8e6WtRvVutfvpFIKSyeqfPG38asD5PeIofQZ9C1SbkU8z20pOP7S/5h76qRCyMrKfWByDRyIpPGjhvDGQcj6h7/D9mK1Wa0wy/LYhrKpPq80cV20yKdnkPSvOGC4sgsdpeNzTsA3IcYonBpIvNDn9DgzqNtIUukz27MPYamw8KXicOWl7BC0lyzB3TOPV7im46WRwlBHbaWka3RnYD1iWyQaA/K0//AJJbx/rTD8ATRzhjT7aCzS6t4jEZlBdO2aDfKEq3M1pbsM8qSS+zYf60/o4LcEn+S9h9mKNk0C4JOeFrD7IUazTFbzWVzk1lAa60r67qfofEUMogeZYLZiQvYkimZDQO2gS74g1IOMr4Cxn8f40qIqrVtVk1HUp7m5GIpDkwqSFOOmfOutO1Mz3MSXciQW5fAJXKg4wCR3x+6j2q6AWhk9DSMCa5MaMfqgf7Vl9wdPaacJ53CxqMsAd/ZUmRNVgvLO9f0pX8XmyJGGQ/kQehFQ5C08iPLKXdjgkjtRF7q68UzXCPNBESiq45k5uuDn8a8PDljWS9ulKsThFYYJc+z8fuq4lAfHMcdO1cV0N60RTDFOD1qZCxx1qFUuDdanJWN7S42361Kjd9sMahxKebvR7SbONirPuaz5dNnHNo72L+CZZizHtQHU1KTgHyqyby0SSyKqMEYPSkXiW38KSOT9brRxZfkOfH8AXvUu2laJuQ9D6wB8/9qidqk3IXkt2VTvGASe+5rTZtil0e+EtSNvdxXw2Uxei3Gf8A1B0XPtA5fhVuafCqabbxsvSMZFUJw08k11DaISfHmjGfc2c/DNfQYwEUDYAAVOKsvWkVUXkUYWk/iQifU789fR9Of4tn+FN+aTbxhLFxNdN9WMxA+5c/vNVUinBW3C9h9kKNUH4PHLwzYD/2hRYmgOq1XHNWUBpSBQXh9i93q1ye8xUe4AUVkbljZvIGgmgN4eh3VwT9OSRvxpBzZoJYtODLnnuGf8TQf5U9a8GBNNt5Sk8pUnttk7/gPjRzTQc6WDsEiZzVd8eq+q8QSuGbwkHhxlhucZyceWaDKt8YFvPCh8aKEYzl+bmbH0vKol0R4xJZpMHqxzk969XspzNJFGDIVGSV7DzqRBo0zzRxSsFYjmYDcqv8fZT2WkBRuAOpNSry09F0+zldSHujI6E/0YPKNvaeY1w1m5uPRnfwGJGJJfVUA9G91SuIdSGp3sbxW4t7eCBIIoVOQnKN/wAc/dimQTUq032rw5akWYwxqcvFYfsnqmMHzo/pPMMbUKSPmUEUasMrEM5rLnXoYTRkRMoMnbHSlDja2EcQIG3NkU1WkmYxk5pa4vLS4T6oyanj/ZXL+lJA6mprP41jDH6xePmAAHRev7Saj8nU1N02Tw3K4yXBVcKep93ettuo82Si3yfkNxFahjupyufPFX/n1R7qoLhbSrqDX7a4KPHBE3OWKnde9XjFqdjIqct3bjmHqgygE/camWHcakyMFQk+VJbHm4K1e57zeM+fMb4pp1icQaXczZyFiLbe6lvUYfRPk6mTO4tGJPtxVJFuE/5u2Ge0Q/ZRMmhnCx/k9Y56+EKIk0Bmayuc1lARNRk8LT7hyekZNCbbmh4NXOzNDn7zUriNiNGuAOrDlH37V56mvhcPxRDbZFpB66fEDfQxnPKtsNqn3Gj2UyuWgUsUIzio1kQuqTZ2Cwr91RtT4u0qxjmBmMksanmRB0+/pRuHJb4hcN6HpujaNf6jdxAlg0krNv6q9qRbJVkEMs7rDPdt6TO2ceGmcAfAk+zmWp+p8YTajos+n28CJaSeo5Y7vk5IznpS7OW5FSYlnQAfOkHYAAAY+7aouUdJx0w6zrOhDT/DW1t9QvrgAsfqWygeqgbuQOuO+fZVelQGIx08qn3KmOM4jHMTvzHJ86hFWViG+kDvVY3cRlNNBdwKl2sD8x9U58qiCQJICenemLSbqB5FJGSVA6eVLO2RfDjLe3dmp2VgRRqCMCMCiNpZ206c6gDNdSxLCCFGayW7ehJpq0jYdfKg+uW7OWJGTRywm5nxKdh2r2vTA6H5sHbypQWbVbcxGFz6uxqdoUAnleKSJ5EYj6GMg56g9qm6/aHk8WKJinNy7DvU/hjS7a5064kEqNKrAK4PKY2Odt/pe6tFz/BknHrkZctegLbNqMgWNvE9KUNg4GPW393TY+VGLdkdpfydKcgeK/hqFEr7gYONz3wfOokNlLaQAJEGSJZUdWwuNwRt32I3z3713ZERO9ygkVDGxS4QqI0G/sG+2TXCtEShFcejKGICes1xHbQqxbJ3B/DO3Y96Iy3t3qGiyWd38zFPEYgmN07A5O428/ZQyHUbfUlit1mjlkWIieNgQ8gB2YNnG3XqetcS28Gmpd3qoyRSx8j4k5lYHYco8zgYyfOnvKJuONncN/DmpWqWsGnGVvFSMcrsMBx+778Zo2xqrrC/SaW+Xxrn5lc/+IBZYh2GOvl7t8U8aDq3p0aRTH53w1bODuT1G/tB+Brvx8lt1Wfl4ZJvEXzWVzv5j/Cayu26zgnEsmLOCP8AXnUfiK9dfOLS1i/WlQVF4m6WP95WpGvdbD7daQL/ABhrb2M93a28/hvIgVnUbrt09+9I0Um8vIzLbgbSEZyc+XffNGOIP5zX32rf5aFaL+c/5l/zVxt9rVhNa0ySO9yIo5GZDtzNgFd/P99czh4IikTZZD63P6/LnyPnXvf/AJ+X3iocv5iT7JP81TO1Xpr1A4ixywkq8YBwDt286GT7kMAVHYHvRO3+nY/YP++hk/5xveP2V1w9cc/Hm0ZfDIMmjuk6SGjSTPq9c0L0386vvp1tf+HH9o1HLldadODCW7S7ECIYGfjUtjzj2VDi61MTpWdrbhRVIyN65v7hYojjrXr2obqXT76BsMYWl9aXCXEjmNEJjwcFnGc7eQ6Udgs4vyRZWaWBlhePI8VcCNsH1j+G/wDWoRo36PvPtU/dTMv5gf25qd/xE7B7u9mS1im8Nrp5MxH0Vgyx8vU824PtB2rqyBvL+S7t7iWWyjVVfHziuehXA26b+YPsr21X9GN9l/8AquPk+/Rrf3g/9IoympRh3pqKzttLmK21uZVnfEng8z4XIBHTpgnv270P1QyWVoLKOOOOzz6srPnw2yTjfrg980a0n+cF5/dov2tQbi79FD7ZP/row7LPqJ1hIZbVbb0hJ3jj5J+WPDE9cfeNqk2V7HZyRxwjkWIc8aKoAffcYxsRk/GgvDP566/vbf8AS1TtL/RFz/auP2mi9XY9mjv+W7L+lP8AgNZQmsrr86j/AI4v/9k=
                "
              />
              <div className="divider-2" />
              <div className="icon-navigation" onClick={toLogin}>
                <FiChevronDown style={{ color: 'white ' }} />
              </div>
              <div className="text-wrapper">
                ({user.FloorNumber}) Floor Receptionist
              </div>
            </div>
            <div className="navigation-elements-3">
              {' '}
              <div className="navigation-elements-4">
                <FiSettings
                  className="iconSetting"
                  style={{ color: 'black' }}
                />
                <div className="text-wrapper-2">Main Settings</div>
              </div>
              <div className="text-wrapper-3">Settings</div>
            </div>
            <div
              className="overlap-group-wrapper"
              style={{ backgroundColor: SideBarIndex === 1 ? 'gold' : '' }}
            >
              {' '}
              <div className="overlap-group">
                {' '}
                <IoMdAnalytics
                  className="icon-action"
                  style={{ color: 'black' }}
                />{' '}
                <div className="text-wrapper-4">Dashboard</div>
              </div>
            </div>
            <div
              className="navigation-elements-5"
              style={{ backgroundColor: SideBarIndex === 2 ? 'gold' : '' }}
            >
              <div className="overlap-group">
                <FiMessageSquare
                  className="icon-action"
                  style={{ color: 'black' }}
                />
                <div className="text-wrapper-4">Messages</div>
              </div>
            </div>
            <div
              className="navigation-elements-6"
              style={{ backgroundColor: SideBarIndex === 3 ? 'gold' : '' }}
            >
              <div className="overlap-group">
                <MdAssignment
                  className="icon-action"
                  style={{ color: 'black' }}
                />
                <div className="text-wrapper-4">Register</div>
              </div>
            </div>
          </div>
          <div className="navigation-elements-7">
            <FaUsers className="iconSetting" style={{ color: 'black' }} />
            <div className="text-wrapper-2">Clients</div>
          </div>
          <div className="navigation-elements-8">
            <IoIosNotifications
              className="iconSetting"
              style={{ color: 'black' }}
            />
            <div className="text-wrapper-2">Notifications</div>
          </div>
        </div>
        <div className="divider-3" />
      </div>
    </div>
  );
};

export default FloorSideBar;
