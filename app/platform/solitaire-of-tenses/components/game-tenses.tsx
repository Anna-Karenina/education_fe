import { Box } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import s from "./game-tenses.module.scss";

export interface GameTensesProps {
  tensesCards: any;
}

export function GameTenses(props: GameTensesProps) {
  console.log(props);

  return (
    <>
      {props?.tensesCards?.map((t, i: number) => (
        <Card
          id={t.id}
          key={t.id}
          attrs={t.attributes}
        >
          {/* {arr.map((a, index) => (
            <Box
              key={index}
              top={`${15 * index}px`}
              backgroundColor={index % 2 ? "red" : "gray"}
              className={s.card}
            >
              {index}
            </Box>
          ))} */}
        </Card>
      ))}
    </>
  );
}

const Card = ({ id, attrs, children }) => {
  const { setNodeRef } = useDroppable({
    id,
    data: { tenseId: id },
  });

  return (
    <Box position="relative">
      <Box
        className={s.container}
        ref={setNodeRef}
        aria-label="Droppable region"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        border="1px"
        borderColor="gray.400"
        borderStyle="dashed"
        p="1rem"
        borderRadius="12px"
        mb="1rem"
      >
        <Box textStyle="tensesCardH1">{attrs.name}</Box>
        <Box textStyle="tensesCardH2">{attrs.localizationName}</Box>
      </Box>
      {children}
    </Box>
  );
};
