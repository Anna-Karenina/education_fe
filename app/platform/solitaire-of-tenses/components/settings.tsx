import { CREATEGAME, CREATEGAMECARD, GETTENSE } from "@/app/lib/schema";
import { useMutation, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Checkbox,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

export interface SettingsProps {
  submitCallback: (newGameId: number) => void;
}

export const Settings = (props: SettingsProps) => {
  const [mappedItems, setMappedItems] = useState([]);
  const [radioValue, setRadionValue] = useState("0");
  const [createLoading, setCreateLoading] = useState(false);

  const { loading, error, data } = useQuery(GETTENSE, {
    fetchPolicy: "no-cache",
    variables: {
      pagination: { limit: 20 },
      sort: ["name"],
    },
  });

  useEffect(() => {
    setMappedItems(
      data?.tenses.data.map((n) => ({
        id: n.id,
        name: n.attributes.name,
        selected: false,
      }))
    );
  }, [data]);

  const [createGame, { data: createGameData, loading: lo, error: err }] =
    useMutation(CREATEGAME);

  const [
    createGameCard,
    { data: createdGameCardData, loading: loa, error: errorr },
  ] = useMutation(CREATEGAMECARD);

  const onCreateGame = async () => {
    setCreateLoading(true);
    let gameId = 0;

    const selectedTenses =
      radioValue === "0"
        ? mappedItems.map((item) => item.id)
        : mappedItems.filter((item) => item.selected).map((item) => item.id);

    const userId = await getSession().then((v) => v?.id);
    const cardsIds: Array<string> = await createGame({
      variables: {
        data: {
          user: userId,
          selected_tenses: selectedTenses,
          publishedAt: new Date().toISOString(),
        },
      },
    }).then((v) => {
      gameId = v?.data.createTensesGame?.data.id;
      return v.data.createTensesGame.data.attributes.selected_tenses.data
        .map((i) => i.attributes.tenses_cards.data.map((io) => io.id))
        .flat();
    });

    for (const idx in cardsIds) {
      await createGameCard({
        variables: {
          data: {
            tenses_game: gameId,
            tenses_card: cardsIds[idx],
            publishedAt: new Date().toISOString(),
          },
        },
      });
    }

    props.submitCallback(gameId);
  };

  return (
    <Box>
      <RadioGroup
        onChange={setRadionValue}
        value={radioValue}
      >
        <Stack spacing={5}>
          <Radio
            colorScheme="green"
            value="0"
          >
            Use all tenens
          </Radio>

          <Radio
            colorScheme="green"
            value="1"
            alignItems="baseline"
          >
            Select tenenses
            <Stack
              pl={2}
              mt={1}
              spacing={1}
            >
              {loading ? (
                <div>loa</div>
              ) : (
                mappedItems?.map((n, i) => {
                  return (
                    <Checkbox
                      disabled={radioValue === "0"}
                      key={i}
                      // isChecked={checkedItems[i]}
                      onChange={
                        () =>
                          setMappedItems(
                            mappedItems.map((item, idx) =>
                              idx === i
                                ? { ...item, selected: !item.selected }
                                : item
                            )
                          )
                        // (e) => {}
                        // setMappedItems(
                        //   mappedItems.map((c, indx) =>
                        //     indx === i ? { ...c, selected: !c.selected } : c
                        //   )
                        // )
                      }
                    >
                      {n.name}
                    </Checkbox>
                  );
                })
              )}
            </Stack>
          </Radio>
        </Stack>
      </RadioGroup>
      <Button
        mt="20px"
        colorScheme="teal"
        size="md"
        onClick={onCreateGame}
        isLoading={createLoading}
        loadingText="Submitting"
      >
        Go go go!
      </Button>
    </Box>
  );
};
