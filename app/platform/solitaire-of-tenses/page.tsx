"use client";
import styles from "./page.module.scss";
import useSound from "use-sound";
import { useState, useEffect, ReactNode, useRef } from "react";
import {
  Box,
  Button,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  useDisclosure,
} from "@chakra-ui/react";
import { Settings } from "./components/settings";
import { GameTenses } from "./components/game-tenses";
import { DndContext } from "@dnd-kit/core";
import { useMutation, useQuery } from "@apollo/client";
import { GameCards } from "./components/game-cards";
import { GameAreaId } from "./components/card-area";
import { FinishModal } from "./components/finish-game-modal";
import { CloseIcon, RepeatIcon } from "@chakra-ui/icons";
import {
  TenseRelationResponseCollection,
  TensesGameCartEntity,
  Enum_Tensesgamecart_Status,
  TensesGameFiltersInput,
} from "@/app/lib/__generated__/graphql";
import { useVanta } from "@/app/lib/hooks/useVanta";
import { GETGAME2, PUTCARDINTENSE } from "@/app/lib/schema";
import { useRouter } from "next/navigation";

export default function SolitaireOfTenses() {
  const router = useRouter();
  const gameCardsArea = useRef();
  const [isNewGame, setIsNewGame] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [reward] = useSound("/sounds/reward.mp3");
  const [error] = useSound("/sounds/error.mp3");
  const [loading, setLoading] = useState(true);
  const [tensesCards, setTensesCards] =
    useState<TenseRelationResponseCollection | null>(null);
  const [gameCards, setGameCards] =
    useState<Array<TensesGameCartEntity> | null>(null);

  const filters = {
    user: {
      id: {
        eq: null,
      },
    },
  } as TensesGameFiltersInput;

  const game = useQuery(GETGAME2, {
    fetchPolicy: "no-cache",
    variables: { filters },
  });

  const [updateGameProgress] = useMutation(PUTCARDINTENSE);

  useEffect(() => {
    const { current } = gameCardsArea;
    let { loading: _loading, data, error } = game;
    setLoading(_loading);
    if (_loading) return;
    if (!game.data) return;
    const tensesGame = data?.tensesGames?.data[0]?.attributes;

    if (!tensesGame) {
      setIsNewGame(true);
    }

    let tenseCards = tensesGame?.selected_tenses?.data?.map((st) => ({
      ...st,
      guessedCards: [],
    }));

    setGameCards(
      tensesGame?.tenses_game_carts?.data
        ?.map((v, index: number) => {
          let y = 0;
          let x = 0;
          if (v.attributes.status === Enum_Tensesgamecart_Status.Guessed) {
            tenseCards = tenseCards.map((tc) => {
              return tc?.id ===
                v?.attributes?.tenses_card?.data?.attributes?.tense?.data?.id
                ? { ...tc, guessedCards: [...tc.guessedCards, v] }
                : tc;
            });
          } else {
            if (current.clientWidth > index * 270 + 270) {
              x = index * 270;
            } else {
              y = 250;
            }

            return {
              ...v,
              position: {
                x,
                y,
              },
            };
          }
        })
        .filter((v) => v)
    );

    setTensesCards(tenseCards);
  }, [game]);

  const handleDragEnd = (ev) => {
    const { active, over, delta } = ev;

    const isAreaDragging = over.id === GameAreaId;
    if (isAreaDragging) {
      _moveCard(active, delta);
    } else {
      const wringTense =
        over.data?.current?.tenseId !== active?.data?.current?.tenseId;
      const rightTense =
        over.data?.current?.tenseId === active?.data?.current?.tenseId;

      if (over && rightTense) {
        _changeCardStatus(active, Enum_Tensesgamecart_Status.Guessed);
        reward();
      } else if (over && wringTense) {
        error();
        _changeCardStatus(active, Enum_Tensesgamecart_Status.Error);
      }
    }
  };

  const _changeCardStatus = (active, status: Enum_Tensesgamecart_Status) => {
    updateGameProgress({
      variables: {
        id: active.id,
        data: {
          status: status,
        },
      },
    });

    if (status === Enum_Tensesgamecart_Status.Error) return;
    const updated = gameCards!.filter((x) => x.id !== active.id);

    setGameCards(updated);

    if (updated.length === 0) {
      onOpen();
      setIsNewGame(true);
    }
  };

  const _moveCard = (active, delta) => {
    const note = gameCards!.find((x) => x.id === active.id);
    note.position.x += delta.x;
    note.position.y += delta.y;
    const updated = gameCards.map((x) => (x.id === note.id ? note : x));
    setGameCards(updated);
  };

  const onNewGameCreate = (gId: number) => {
    console.log(gId);

    setIsNewGame(false);
    game.refetch();
  };

  const leaveGame = () => {
    router.push("/");
  };
  return (
    <VantaBg>
      <DndContext onDragEnd={handleDragEnd}>
        <aside className={styles.aside}>
          <Box
            backgroundColor="transparent"
            p="1rem"
            w="100%"
          >
            <>{!loading && <GameTenses tensesCards={tensesCards} />}</>
          </Box>
          <Box
            h="40px"
            backgroundColor="white.400"
            pos="absolute"
            bottom="0px"
            w="100%"
            left="0px"
            borderTop="1px"
            borderColor="gray.200"
            paddingX="12px"
          >
            <Popover>
              <PopoverTrigger>
                <IconButton
                  variant="customIconWhiteButton"
                  aria-label="Repeat"
                  icon={<RepeatIcon />}
                />
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverHeader>Reatart this game?</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Button
                      colorScheme="teal"
                      size="xs"
                      mr="20px"
                      paddingX="15px"
                    >
                      No
                    </Button>
                    <Button
                      colorScheme="teal"
                      size="xs"
                      paddingX="15px"
                    >
                      Yes
                    </Button>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>

            <Popover>
              <PopoverTrigger>
                <IconButton
                  variant="customIconWhiteButton"
                  aria-label="Repeat"
                  icon={<CloseIcon />}
                />
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverHeader>Leave this game?</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Button
                      colorScheme="teal"
                      size="xs"
                      mr="20px"
                      paddingX="15px"
                    >
                      No
                    </Button>
                    <Button
                      onClick={leaveGame}
                      colorScheme="teal"
                      size="xs"
                      paddingX="15px"
                    >
                      Yes
                    </Button>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
          </Box>
        </aside>
        <article
          className={styles.article}
          ref={gameCardsArea}
        >
          <FinishModal
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
          />
          {isNewGame ? (
            <Box
              p="1rem"
              h="100%"
              display="grid"
            >
              <Box
                backgroundColor={"hsla(0, 0%, 100%, 0.93)"}
                borderRadius="12px"
                border="1px"
                borderColor="gray.200"
                width="fit-content"
                p="1rem"
                justifySelf="center"
                alignSelf="center"
              >
                <Settings submitCallback={onNewGameCreate} />
              </Box>
            </Box>
          ) : (
            <>{!loading && <GameCards gameCards={gameCards} />}</>
          )}
        </article>
      </DndContext>
    </VantaBg>
  );
}

const VantaBg = ({ children }: { children: ReactNode }) => {
  const vantaRef = useVanta();
  return (
    <main
      className={styles.main}
      ref={vantaRef}
    >
      {children}
    </main>
  );
};
