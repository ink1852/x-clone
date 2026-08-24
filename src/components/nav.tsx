import { Link, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";
import { useState } from "react";
const Header = styled.header`
  --hover-color: #c4c4c411;
  --border-color: #f3f3f323;
  --bg-color: #17181a;
  border-right: 1px solid var(--border-color);
  display: flex;
  justify-content: end;
  > div {
    width: inherit;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 275px;
    padding: 0 8px;
    & + .logOutBox {
      display: none;
    }
  }
`;
const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const LogoImg = styled.img`
  display: block;
  height: 24px;
`;
const MenuItem = styled.div<{ $logo?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  padding-right: ${(prop) => (prop.$logo ? "12px" : "18px")};
  border-radius: 50px;
  &:hover {
    background-color: ${(prop) => (prop.$logo ? "var(--hover-color)" : null)};
  }
`;
const MenuContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  svg {
    /* icons */
    height: 30px;
    margin-right: 20px;
  }
  > a {
    display: flex;
    width: 100%;
    justify-content: flex-start;
    &:hover {
      ${MenuItem} {
        transition: all 0.25s;
        background-color: var(--hover-color);
      }
    }
  }
`;
const Text = styled.span<{ $clicked?: boolean }>`
  text-align: center;
  text-transform: capitalize;
  font-size: 20px;
  font-weight: ${(prop) => (prop.$clicked ? "bold" : 500)};
`;
const Account = styled.div`
  position: relative;
  display: flex;
  margin: 12px 0;
  width: 100%;
`;
const Button = styled.button`
  border-radius: 50px;
  display: flex;
  align-items: center;
  color: #fff;
  background-color: transparent;
  border: none;
  padding: 12px;
  width: 100%;
  &:hover {
    transition: background-color 0.25s;
    background-color: var(--hover-color);
  }
  /* user name */
  > span {
    font-size: 18px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
  }
`;
const EpliseIcon = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  > svg {
    height: 20px;
  }
`;
const ProfileImg = styled.img`
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
`;
const Modal = styled.div<{ $isModalOpen: boolean }>`
  display: none;
  display: ${(prop) => (prop.$isModalOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;
const ModalBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  /* background-color: #a4303046; */
`;
const ModalBox = styled.div`
  transition: background-color 0.25s;
  position: absolute;
  left: 0;
  bottom: 80px;
  background-color: #1f1e1e;
  width: 280px;
  padding: 12px 0px;
  border-radius: 12px;
  transition: all 0.5s;
`;
const LogOutBox = styled.div`
  font-size: 16px;
  padding: 16px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    background-color: var(--hover-color);
  }
`;

export function Nav() {
  const homeMatch = useMatch("/home");
  const notificationMatch = useMatch("/notification");
  const profileMatch = useMatch("/profile");
  const nav = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userName = String(auth.currentUser?.displayName).trim();
  const onLogOut = async () => {
    const ok = confirm("Are you sure you want to log out?");
    if (ok) {
      await auth.signOut();
      nav("/login");
    }
  };
  return (
    <>
      <Header>
        <div>
          <Menu>
            <Link to={"/home"}>
              <MenuContainer>
                <MenuItem $logo>
                  <LogoImg src={"/X-logo.svg"} />
                </MenuItem>
              </MenuContainer>
            </Link>

            <MenuContainer>
              <Link to={"/home"}>
                <MenuItem>
                  {homeMatch !== null ? (
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      fill="none"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                  )}
                  <Text $clicked={homeMatch !== null}>home</Text>
                </MenuItem>
              </Link>
            </MenuContainer>

            <MenuContainer>
              <Link to={"/notification"}>
                <MenuItem>
                  {notificationMatch !== null ? (
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M10 2a6 6 0 0 0-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 0 0 .515 1.076 32.91 32.91 0 0 0 3.256.508 3.5 3.5 0 0 0 6.972 0 32.903 32.903 0 0 0 3.256-.508.75.75 0 0 0 .515-1.076A11.448 11.448 0 0 1 16 8a6 6 0 0 0-6-6ZM8.05 14.943a33.54 33.54 0 0 0 3.9 0 2 2 0 0 1-3.9 0Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      fill="none"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                      />
                    </svg>
                  )}
                  <Text>notifications</Text>
                </MenuItem>
              </Link>
            </MenuContainer>

            <MenuContainer>
              <Link to={"/profile"}>
                <MenuItem>
                  {profileMatch !== null ? (
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      fill="none"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  )}
                  <Text>profile</Text>
                </MenuItem>
              </Link>
            </MenuContainer>
          </Menu>
          <Account>
            <Button onClick={() => setIsModalOpen(true)}>
              <ProfileImg
                src={`${auth.currentUser?.photoURL ?? "/public/user.jpg"}`}
              />
              <span>{userName}</span>
              <EpliseIcon>
                <svg
                  fill="none"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </EpliseIcon>
            </Button>
            <Modal $isModalOpen={isModalOpen}>
              <ModalBg
                onClick={() => {
                  setIsModalOpen(false);
                }}
              />
              <ModalBox>
                <LogOutBox onClick={onLogOut}>Log out {userName}</LogOutBox>
              </ModalBox>
            </Modal>
          </Account>
        </div>
      </Header>
    </>
  );
}
