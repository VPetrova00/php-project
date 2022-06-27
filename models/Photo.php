<?php

class Photo implements JsonSerializable
{
    private $id;

    private $name;

    private $date;

    private $width;

    private $height;

    private $collection_id;


    public function __construct(int $id, string $name, string $date, int $width, int $height, int $collection_id) {
        $this->id = $id;
        $this->name = $name;
        $this->date = $date;
        $this->width = $width;
        $this->height = $height;
        $this->collection_id = $collection_id;
    }

    public function getId(): int {
        return $this->id;
    }

    public function getDate(): string {
        return $this->date;
    }

    public function getWidth(): string {
        return $this->width;
    }
    public function getHeight(): string {
        return $this->height;
    }

    public function getName(): string {
        return $this->name;
    }

    /**
     * @return int
     */
    public function getCollectionId(): int
    {
        return $this->collection_id;
    }

    public function jsonSerialize(): array {
        return get_object_vars($this);
    }

    public static function createFromAssoc(array $assocPhoto): Photo {
        return new Photo($assocPhoto['id'], $assocPhoto['name'], $assocPhoto['date'], $assocPhoto['width'], $assocPhoto['height'], $assocPhoto['collection_id']);
    }
}