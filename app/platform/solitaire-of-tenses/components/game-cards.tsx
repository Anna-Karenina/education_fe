import { Box } from "@chakra-ui/react";
import { useDraggable } from "@dnd-kit/core";
import { GameArea } from "./card-area";
import {
  Enum_Tensescard_Type,
  Enum_Tensesgamecart_Status,
  TensesGameCartEntity,
} from "@/app/lib/__generated__/graphql";

export interface SelectedTenseCardsProps {
  gameCards: Array<TensesGameCartEntity>;
}

export const GameCards = (props: SelectedTenseCardsProps) => {
  return (
    <GameArea>
      {props?.gameCards?.map((t) => (
        <Card
          attrs={t.attributes}
          id={t.id}
          key={t.id}
          styles={{
            left: `${t.position.x}px`,
            top: `${t.position.y}px`,
          }}
        />
      ))}
    </GameArea>
  );
};

const Card = (props: any) => {
  // console.log(props);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    data: { tenseId: props.attrs.tenses_card.data.attributes.tense.data.id },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : {};

  const _getBgc = () => {
    const type = props.attrs.tenses_card.data.attributes
      .type as Enum_Tensescard_Type;
    let color = "white";
    switch (type) {
      case Enum_Tensescard_Type.SignalWords:
        color = "red";
        break;
      case Enum_Tensescard_Type.WhenWeUse:
        color = "black";
        break;
      case Enum_Tensescard_Type.AuxiliaryVerb:
        color = "green";
        break;
      default:
        break;
    }
    return `${color}`;
  };

  return (
    <Box
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ ...style, ...props.styles }}
      height="fit-content"
      w="250px"
      position="absolute"
      border="1px"
      padding="1rem"
      borderRadius="12px"
      bgColor="white"
      opacity="0.9"
      borderColor={_getBgc()}
      borderStyle="dashed"
      whiteSpace="break-spaces"
      fontSize="14px"
    >
      {props.attrs.tenses_card.data.attributes.description}
    </Box>
  );
};
